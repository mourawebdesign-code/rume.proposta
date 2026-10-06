// Stack the same crop from reference (top) and local (bottom) for visual comparison.
// usage: node tools/crop.mjs home_1440 0 0 1440 700 [out]
import fs from 'node:fs';
import { PNG } from 'pngjs';

const [slug, x, y, w, h, outName] = process.argv.slice(2);
const X = +x, Y = +y, W = +w, H = +h;
const load = (f) => PNG.sync.read(fs.readFileSync(f));
const a = load(`tools/ref/${slug}.png`);
const b = load(`tools/cmp/${slug}.png`);
const out = new PNG({ width: W, height: H * 2 + 4 });
out.data.fill(255);
const blit = (img, dy) => {
  for (let yy = 0; yy < H; yy++) {
    for (let xx = 0; xx < W; xx++) {
      const sx = X + xx, sy = Y + yy;
      const o = ((dy + yy) * W + xx) * 4;
      if (sx >= img.width || sy >= img.height) { out.data[o + 3] = 255; continue; }
      const i = (sy * img.width + sx) * 4;
      img.data.copy(out.data, o, i, i + 4);
    }
  }
};
blit(a, 0);
blit(b, H + 4);
const file = `tools/cmp/crop_${outName || slug + '_' + Y}.png`;
fs.writeFileSync(file, PNG.sync.write(out));
console.log(file);
