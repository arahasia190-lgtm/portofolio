import Matter from "matter-js";
import { createLanyard, PHYSICS } from "../src/lib/lanyard.ts";

const configs = [
  ["desktop", 640, 900, 300, 440, 210],
  ["mobile", 375, 620, 220, 330, 130],
] as const;

const variants = JSON.parse(process.argv[2] ?? "[{}]");
for (const v of variants) {
  Object.assign(PHYSICS, v);
  console.log("==", JSON.stringify(v));
  for (const [label, w, h, cw, ch, rope] of configs) {
    const sim = createLanyard(Matter, {
      width: w, height: h, anchor: { x: w / 2, y: -12 }, cardWidth: cw, cardHeight: ch, ropeLength: rope, drop: true,
    });
    const restY = -12 + rope + ch / 2;
    let maxY = -1e9, settle = 0, lastY = 0, dir = 0, lastX = w / 2, xdir = 0;
    const vt: string[] = [], sw: string[] = [];
    for (let t = 0; t < 9000; t += 1000 / 60) {
      sim.step(1000 / 60);
      const f = sim.frame();
      const { x, y } = f.card;
      if (t > 600) maxY = Math.max(maxY, y);
      const d = Math.sign(y - lastY);
      if (t > 600 && d && dir && d !== dir) vt.push(`${(t / 1000).toFixed(2)}:${(y - restY).toFixed(0)}`);
      if (d) dir = d; lastY = y;
      const dx = Math.sign(x - lastX);
      if (dx && xdir && dx !== xdir) sw.push(`${(t / 1000).toFixed(2)}:${(x - w / 2).toFixed(0)}`);
      if (dx) xdir = dx; lastX = x;
      if (sim.speed() > 0.12) settle = t;
    }
    const f = sim.frame();
    console.log(`${label} rest sag=${(f.card.y - restY).toFixed(0)} maxOver=${(maxY - restY).toFixed(0)} floorGap=${(h - ch / 2 - maxY).toFixed(0)} settle=${(settle / 1000).toFixed(1)}s`);
    console.log("  vert", vt.slice(0, 6).join(" "), " | swing", sw.slice(0, 8).join(" "));
  }
}
