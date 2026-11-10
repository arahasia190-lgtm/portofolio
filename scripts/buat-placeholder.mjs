// Membuat gambar pengganti: public/foto.webp (siluet 4:5) dan public/proyek-N.webp.
// Jalankan ulang hanya kalau ingin mengembalikan placeholder: npm run placeholder
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public", { recursive: true });

const foto = `
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="1200" viewBox="0 0 960 1200">
  <rect width="960" height="1200" fill="#CFE3FB"/>
  <rect y="760" width="960" height="440" fill="#BBD6F7"/>
  <circle cx="480" cy="430" r="190" fill="#1F4F8F"/>
  <rect x="420" y="590" width="120" height="120" rx="40" fill="#1F4F8F"/>
  <path d="M120 1200 C 130 900, 260 720, 480 700 C 700 720, 830 900, 840 1200 Z" fill="#1F4F8F"/>
  <path d="M400 712 L480 860 L560 712 Z" fill="#CFE3FB"/>
</svg>`;

const frame = (inner) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
  <rect width="1200" height="750" fill="#DCEBFC"/>
  <rect x="60" y="50" width="1080" height="700" rx="18" fill="#FFFFFF"/>
  <rect x="60" y="50" width="1080" height="52" rx="18" fill="#0F1D35"/>
  <rect x="60" y="84" width="1080" height="18" fill="#0F1D35"/>
  <circle cx="98" cy="76" r="8" fill="#4DA3FF"/><circle cx="124" cy="76" r="8" fill="#C7DEFA"/><circle cx="150" cy="76" r="8" fill="#C7DEFA"/>
  ${inner}
</svg>`;

const tiles = Array.from({ length: 9 }, (_, i) => {
  const x = 100 + (i % 3) * 210;
  const y = 140 + Math.floor(i / 3) * 190;
  return `<rect x="${x}" y="${y}" width="190" height="170" rx="12" fill="#EAF4FF"/>
  <rect x="${x + 16}" y="${y + 16}" width="158" height="90" rx="8" fill="#C7DEFA"/>
  <rect x="${x + 16}" y="${y + 120}" width="110" height="12" rx="6" fill="#0A1A33" opacity=".7"/>
  <rect x="${x + 16}" y="${y + 142}" width="60" height="10" rx="5" fill="#2F8CFF"/>`;
}).join("");
const kasir = frame(`${tiles}
  <rect x="760" y="140" width="340" height="560" rx="12" fill="#F3F8FF" stroke="#C7DEFA" stroke-width="2"/>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="790" y="${180 + i * 52}" width="180" height="12" rx="6" fill="#0A1A33" opacity=".6"/><rect x="1010" y="${180 + i * 52}" width="60" height="12" rx="6" fill="#0A1A33" opacity=".6"/>`).join("")}
  <rect x="790" y="470" width="280" height="2" fill="#C7DEFA"/>
  <rect x="790" y="500" width="120" height="18" rx="9" fill="#0A1A33"/><rect x="980" y="500" width="90" height="18" rx="9" fill="#0A1A33"/>
  <rect x="790" y="620" width="280" height="56" rx="10" fill="#2F8CFF"/>`);

const umkm = frame(`
  <rect x="100" y="140" width="1000" height="250" rx="14" fill="#C7DEFA"/>
  <circle cx="900" cy="265" r="90" fill="#2F8CFF" opacity=".55"/>
  <rect x="150" y="200" width="380" height="34" rx="10" fill="#0A1A33"/>
  <rect x="150" y="254" width="300" height="16" rx="8" fill="#0A1A33" opacity=".5"/>
  <rect x="150" y="310" width="170" height="46" rx="23" fill="#0F1D35"/>
  ${[0, 1, 2, 3].map((i) => `<rect x="${100 + i * 255}" y="420" width="235" height="290" rx="14" fill="#EAF4FF"/><rect x="${118 + i * 255}" y="438" width="199" height="160" rx="10" fill="#BBD6F7"/><rect x="${118 + i * 255}" y="616" width="140" height="14" rx="7" fill="#0A1A33" opacity=".7"/><rect x="${118 + i * 255}" y="644" width="80" height="14" rx="7" fill="#2F8CFF"/>`).join("")}`);

const qr = Array.from({ length: 81 }, (_, i) => {
  const on = (i * 37 + (i % 7) * 11) % 5 < 2;
  return on ? `<rect x="${150 + (i % 9) * 36}" y="${190 + Math.floor(i / 9) * 36}" width="32" height="32" fill="#0A1A33"/>` : "";
}).join("");
const absen = frame(`
  <rect x="100" y="140" width="420" height="560" rx="14" fill="#EAF4FF"/>
  <rect x="130" y="170" width="360" height="360" rx="8" fill="#FFFFFF"/>
  ${qr}
  <rect x="150" y="190" width="100" height="100" fill="none" stroke="#0A1A33" stroke-width="16"/>
  <rect x="370" y="190" width="100" height="100" fill="none" stroke="#0A1A33" stroke-width="16"/>
  <rect x="150" y="410" width="100" height="100" fill="none" stroke="#0A1A33" stroke-width="16"/>
  <rect x="130" y="570" width="360" height="16" rx="8" fill="#2F8CFF"/>
  <rect x="130" y="600" width="240" height="16" rx="8" fill="#C7DEFA"/>
  <rect x="560" y="140" width="540" height="56" rx="10" fill="#0F1D35"/>
  ${Array.from({ length: 9 }, (_, i) => `<rect x="560" y="${214 + i * 54}" width="540" height="46" rx="8" fill="${i % 2 ? "#FFFFFF" : "#F3F8FF"}"/><rect x="584" y="${231 + i * 54}" width="${150 + ((i * 53) % 90)}" height="12" rx="6" fill="#0A1A33" opacity=".65"/><rect x="980" y="${226 + i * 54}" width="96" height="22" rx="11" fill="${i === 3 || i === 7 ? "#C7DEFA" : "#2F8CFF"}"/>`).join("")}`);

const jobs = [
  ["public/foto.webp", foto],
  ["public/proyek-1.webp", kasir],
  ["public/proyek-2.webp", umkm],
  ["public/proyek-3.webp", absen],
];
for (const [out, svg] of jobs) {
  const info = await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(out);
  console.log(out, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`);
}
