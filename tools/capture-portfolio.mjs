import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import path from 'path';

const OUT_DIR = process.argv[2];
mkdirSync(OUT_DIR, { recursive: true });

const sites = [
  { slug: 'clinica-estetica-02', url: 'https://clinica-estetica-02-git-clinica-estetica-02-rume2.vercel.app/' },
  { slug: 'lumea', url: 'https://lumea-aesthetics-three.vercel.app/' },
  { slug: 'organiccare', url: 'https://organiccare.framer.website/' },
  { slug: 'eclat', url: 'https://eclat-template.framer.website/' },
  { slug: 'klinik', url: 'https://klinik-template.framer.website/' },
  { slug: 'epidermis', url: 'https://epidermis.framer.website/' },
];

const only = process.argv[3];
const targets = only ? sites.filter((s) => s.slug === only) : sites;

const browser = await chromium.launch();
const results = [];

for (const site of targets) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  console.log(`-> ${site.slug}: loading ${site.url}`);
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch (e) {
    console.log(`   networkidle timeout, continuing: ${e.message}`);
  }
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(2500);
  // scroll through the page slowly (both directions) to trigger scroll-linked
  // reveal animations and lazy-loaded images, then settle before shooting.
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = 300;
    const max = document.body.scrollHeight;
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await wait(180);
    }
    window.scrollTo(0, max);
    await wait(600);
    for (let y = max; y > 0; y -= step) {
      window.scrollTo(0, y);
      await wait(90);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.evaluate(async () => {
    const imgs = Array.from(document.images).filter((img) => !img.complete);
    await Promise.all(
      imgs.map((img) => new Promise((res) => {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
        setTimeout(res, 4000);
      }))
    );
  });
  await page.waitForTimeout(500);

  const outPath = path.join(OUT_DIR, `${site.slug}.jpg`);
  await page.screenshot({ path: outPath, fullPage: true, type: 'jpeg', quality: 82 });

  const dims = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, h: document.body.scrollHeight }));
  results.push({ ...site, ...dims });
  console.log(`   saved ${outPath} (${dims.w}x${dims.h})`);
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
