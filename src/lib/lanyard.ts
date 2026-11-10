import type * as MatterNS from "matter-js";

type MatterLib = typeof MatterNS;
type Vec = { x: number; y: number };

export type LanyardOptions = {
  /** Lebar dan tinggi area simulasi (px). */
  width: number;
  height: number;
  /** Titik tali terpaku (px, koordinat area). */
  anchor: Vec;
  cardWidth: number;
  cardHeight: number;
  /** Panjang tali dari paku sampai klip kartu. */
  ropeLength: number;
  /** Mulai dari atas layar lalu jatuh. */
  drop: boolean;
};

export type LanyardFrame = {
  rope: Vec[];
  card: { x: number; y: number; angle: number };
};

export const PHYSICS = {
  segments: 6,
  gravity: 0.0024,
  /** Bagian atas tali sedikit elastis: sumber pantulan saat kartu jatuh. */
  topStiffness: 0.08,
  topDamping: 0.02,
  linkStiffness: 0.95,
  cardAir: 0.024,
  ropeAir: 0.05,
  dropTilt: 0.28,
  idleForce: 0.00001,
  ropeDensity: 0.06,
  cardDensity: 0.0003,
  iterations: 14,
};

const STEP = 1000 / 60;

export function createLanyard(Matter: MatterLib, o: LanyardOptions) {
  const { Engine, Bodies, Body, Composite, Constraint } = Matter;
  const P = PHYSICS;

  const engine = Engine.create({
    gravity: { x: 0, y: 1, scale: P.gravity },
    constraintIterations: P.iterations,
    positionIterations: 8,
    velocityIterations: 6,
  });
  const world = engine.world;
  const filter = { group: Body.nextGroup(true) };
  const segLen = o.ropeLength / P.segments;

  // Saat jatuh, seluruh lanyard dimulai di atas layar (miring sedikit agar
  // nanti berayun) dan paku ikut jatuh bebas bersama tali sampai tepi atas.
  const lift = o.drop ? o.ropeLength + o.cardHeight + o.anchor.y + 80 : 0;
  const tilt = o.drop ? P.dropTilt : 0;
  const start = { x: o.anchor.x, y: o.anchor.y - lift };
  const along = (d: number, side = 0): Vec => {
    const v = rotate({ x: side, y: d }, -tilt);
    return { x: start.x + v.x, y: start.y + v.y };
  };

  const segments: MatterNS.Body[] = [];
  for (let i = 1; i <= P.segments; i++) {
    const p = along(segLen * i);
    segments.push(
      Bodies.circle(p.x, p.y, 4, {
        collisionFilter: filter,
        frictionAir: P.ropeAir,
        density: P.ropeDensity,
      }),
    );
  }

  const cardPos = along(o.ropeLength + o.cardHeight / 2);
  const card = Bodies.rectangle(cardPos.x, cardPos.y, o.cardWidth, o.cardHeight, {
    collisionFilter: filter,
    frictionAir: P.cardAir,
    density: P.cardDensity,
    chamfer: { radius: 14 },
  });
  Body.setAngle(card, -tilt);

  const top = Constraint.create({
    pointA: { ...start },
    bodyB: segments[0],
    length: segLen,
    stiffness: P.topStiffness,
    damping: P.topDamping,
  });
  const links: MatterNS.Constraint[] = [top];
  for (let i = 1; i < segments.length; i++) {
    links.push(
      Constraint.create({
        bodyA: segments[i - 1],
        bodyB: segments[i],
        length: segLen,
        stiffness: P.linkStiffness,
        damping: 0.05,
      }),
    );
  }
  links.push(
    Constraint.create({
      bodyA: segments[segments.length - 1],
      bodyB: card,
      // pointB dalam orientasi dunia saat dibuat; Matter memutarnya bersama kartu.
      pointB: rotate({ x: 0, y: -o.cardHeight / 2 }, card.angle),
      length: 0,
      stiffness: 0.9,
      damping: 0.08,
    }),
  );

  Composite.add(world, [...segments, card, ...links]);

  let drag: MatterNS.Constraint | null = null;
  let acc = 0;
  let time = 0;
  let calmFor = 0;
  let dropping = o.drop;
  let entered = !o.drop;

  function clampCard() {
    const b = card.bounds;
    if (!entered && b.min.y >= 0) entered = true;
    let dx = 0;
    let dy = 0;
    if (b.min.x < 0) dx = -b.min.x;
    else if (b.max.x > o.width) dx = o.width - b.max.x;
    if (b.max.y > o.height) dy = o.height - b.max.y;
    else if (entered && b.min.y < 0) dy = -b.min.y;
    if (dx || dy) {
      Body.setPosition(card, { x: card.position.x + dx, y: card.position.y + dy });
      Body.setVelocity(card, {
        x: dx ? card.velocity.x * -0.25 : card.velocity.x,
        y: dy ? card.velocity.y * -0.25 : card.velocity.y,
      });
    }
  }

  function step(dtMs: number) {
    acc += Math.min(dtMs, 100);
    while (acc >= STEP) {
      time += STEP;
      if (dropping) {
        const y = start.y + 0.5 * P.gravity * time * time;
        if (y >= o.anchor.y) {
          top.pointA = { ...o.anchor };
          dropping = false;
        } else {
          top.pointA = { x: start.x, y };
        }
      }
      const s = speed();
      calmFor = !drag && !dropping && s < 0.12 ? calmFor + STEP : 0;
      // Ayunan sangat kecil setelah kartu tenang supaya terasa hidup.
      if (calmFor > 1000) {
        const f = Math.sin((time - 1000) / 1400) * P.idleForce * card.mass;
        Body.applyForce(card, card.position, { x: f, y: 0 });
      }
      Engine.update(engine, STEP);
      if (!dropping) clampCard();
      acc -= STEP;
    }
  }

  function frame(): LanyardFrame {
    const a = top.pointA;
    const rope: Vec[] = [{ x: a.x, y: a.y }, ...segments.map((s) => ({ x: s.position.x, y: s.position.y }))];
    const c = card.position;
    const tip = rotate({ x: 0, y: -o.cardHeight / 2 }, card.angle);
    rope.push({ x: c.x + tip.x, y: c.y + tip.y });
    return { rope, card: { x: c.x, y: c.y, angle: card.angle } };
  }

  const clampPoint = (p: Vec): Vec => ({
    x: Math.max(0, Math.min(o.width, p.x)),
    y: Math.max(0, Math.min(o.height, p.y)),
  });

  function grab(p: Vec) {
    release();
    drag = Constraint.create({
      pointA: clampPoint(p),
      bodyB: card,
      pointB: { x: p.x - card.position.x, y: p.y - card.position.y },
      length: 0,
      stiffness: 0.2,
      damping: 0.15,
    });
    Composite.add(world, drag);
  }

  function move(p: Vec) {
    if (drag) drag.pointA = clampPoint(p);
  }

  function release() {
    if (!drag) return;
    Composite.remove(world, drag);
    drag = null;
  }

  function speed() {
    return Math.hypot(card.velocity.x, card.velocity.y) + Math.abs(card.angularVelocity) * 100;
  }

  function destroy() {
    Composite.clear(world, false);
    Engine.clear(engine);
  }

  return {
    step,
    frame,
    grab,
    move,
    release,
    speed,
    destroy,
    isDragging: () => drag !== null,
    elapsed: () => time,
  };
}

export type Lanyard = ReturnType<typeof createLanyard>;

function rotate(v: Vec, a: number): Vec {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c };
}
