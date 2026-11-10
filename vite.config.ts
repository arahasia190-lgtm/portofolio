import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { meta, profile } from "./src/content.ts";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Judul, deskripsi, dan Open Graph diambil dari src/content.ts.
// og:image selalu menunjuk ke /foto.webp, jadi cukup ganti file fotonya.
function contentMeta(): Plugin {
  return {
    name: "content-meta",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const base = meta.siteUrl.replace(/\/$/, "");
        const image = `${base}/foto.webp`;
        const tags = [
          `<title>${esc(meta.pageTitle)}</title>`,
          `<meta name="description" content="${esc(meta.pageDescription)}" />`,
          `<meta property="og:type" content="profile" />`,
          `<meta property="og:locale" content="id_ID" />`,
          `<meta property="og:title" content="${esc(meta.pageTitle)}" />`,
          `<meta property="og:description" content="${esc(meta.pageDescription)}" />`,
          `<meta property="og:image" content="${esc(image)}" />`,
          `<meta property="og:image:alt" content="${esc(profile.photoAlt)}" />`,
          base ? `<meta property="og:url" content="${esc(base)}/" />` : "",
          `<meta name="twitter:card" content="summary_large_image" />`,
        ];
        const font = Object.keys(ctx.bundle ?? {}).find((f) => /bricolage-grotesque-latin-wdth.*\.woff2$/.test(f));
        if (font) {
          tags.push(`<link rel="preload" href="/${font}" as="font" type="font/woff2" crossorigin />`);
        }
        return html.replace("<!--content-meta-->", tags.filter(Boolean).join("\n    "));
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), contentMeta()],
  build: { assetsInlineLimit: 0 },
});
