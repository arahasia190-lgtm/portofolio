// Mengubah foto asli (JPG/PNG/WebP) jadi public/foto.webp: lebar maks 1200,
// rasio 4:5 (crop dari tengah agak ke atas supaya wajah aman), target < 250 KB.
// Pemakaian: npm run foto -- path/ke/foto-asli.jpg
import sharp from "sharp";

const input = process.argv[2];
if (!input) {
  console.error("Pakai: npm run foto -- path/ke/foto-asli.jpg");
  process.exit(1);
}

const width = 960;
const height = 1200;
let quality = 84;
let info;
do {
  info = await sharp(input)
    .rotate()
    .resize(width, height, { fit: "cover", position: "attention" })
    .webp({ quality })
    .toFile("public/foto.webp");
  quality -= 6;
} while (info.size > 250 * 1024 && quality > 40);

console.log(`public/foto.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`);
