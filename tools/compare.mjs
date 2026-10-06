// Local vs reference: full-page screenshot, pixel diff, and text-element geometry deltas.
// usage: node tools/compare.mjs "/,/about" "1440x900,390x844"
import { chromium } from 'playwright';
import fs from 'node:fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const LOCAL = 'http://localhost:5173';
const pages = (process.argv[2] || '/').split(',');
const viewports = (process.argv[3] || '1440x900').split(',').map((v) => v.split('x').map(Number));
const OUT = 'tools/cmp';
fs.mkdirSync(OUT, { recursive: true });

const textDump = () =>
  [...document.querySelectorAll('body *')]
    .filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
    .map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (r.width < 2 || cs.visibility === 'hidden') return null;
      const t = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').replace(/\s+/g, ' ');
      return { t: t.toLowerCase(), x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize };
    })
    .filter(Boolean);

const parseRef = (file) =>
  fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .slice(1)
    .map((l) => l.split(' | '))
    .filter((p) => p.length >= 4 && /^(P|H1|H2|H3|A|SPAN|BUTTON)$/.test(p[0]) && !p[1].startsWith('['))
    .filter((p) => /^-?\d+,-?\d+ \d+x\d+$/.test(p[2]))
    .map((p) => {
      const [x, y, w, h] = p[2].match(/-?\d+/g).map(Number);
      return { t: p[1].toLowerCase().replace(/\s+/g, ' '), x, y, w, h, fs: (p[3] || '').match(/([\d.]+)px/)?.[1] };
    });

const browser = await chromium.launch();
for (const [w, h] of viewports) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const p of pages) {
    const slug = (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '_')) + `_${w}`;
    await page.goto(LOCAL + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3500);
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += Math.round(h * 0.6)) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(250);
    }
    await page.waitForTimeout(2500);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(800);
    const local = await page.evaluate(textDump);
    await page.screenshot({ path: `${OUT}/${slug}.png`, fullPage: true });

    // pixel diff over common area
    const refFile = `tools/ref/${slug}.png`;
    if (fs.existsSync(refFile)) {
      const a = PNG.sync.read(fs.readFileSync(refFile));
      const b = PNG.sync.read(fs.readFileSync(`${OUT}/${slug}.png`));
      const W = Math.min(a.width, b.width);
      const HH = Math.min(a.height, b.height);
      const crop = (img) => {
        const o = new PNG({ width: W, height: HH });
        for (let yy = 0; yy < HH; yy++) img.data.copy(o.data, yy * W * 4, yy * img.width * 4, yy * img.width * 4 + W * 4);
        return o;
      };
      const diff = new PNG({ width: W, height: HH });
      const n = pixelmatch(crop(a).data, crop(b).data, diff.data, W, HH, { threshold: 0.15 });
      fs.writeFileSync(`${OUT}/${slug}_diff.png`, PNG.sync.write(diff));
      console.log(`\n== ${slug}: ref H=${a.height} local H=${b.height} | diff ${((n / (W * HH)) * 100).toFixed(2)}%`);
    }
    const refTxt = `tools/ref/${slug}.txt`;
    if (fs.existsSync(refTxt)) {
      const ref = parseRef(refTxt);
      const used = new Set();
      for (const r of ref) {
        const i = local.findIndex((l, k) => !used.has(k) && l.t === r.t);
        if (i < 0) {
          console.log(`  MISSING "${r.t.slice(0, 40)}" ref ${r.x},${r.y} ${r.w}x${r.h}`);
          continue;
        }
        used.add(i);
        const l = local[i];
        const d = [l.x - r.x, l.y - r.y, l.w - r.w, l.h - r.h];
        if (d.some((v) => Math.abs(v) > 3)) console.log(`  "${r.t.slice(0, 30)}" dx${d[0]} dy${d[1]} dw${d[2]} dh${d[3]} (ref ${r.x},${r.y} ${r.w}x${r.h} fs${r.fs} | local ${l.x},${l.y} ${l.w}x${l.h} fs${l.fs})`);
      }
    }
  }
  await ctx.close();
}
await browser.close();
