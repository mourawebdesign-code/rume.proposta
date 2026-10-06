// Side-by-side interaction states: card hover, nav hover, mobile menu, ticker speed.
import { chromium } from 'playwright';
import fs from 'node:fs';
const REF = 'https://apexfilms.framer.website';
const LOC = 'http://localhost:5173';
const OUT = 'tools/cmp/interact';
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const hideBadge = (p) => p.addStyleTag({ content: '#__framer-badge-container,[data-framer-name="Buy Template Module"]{display:none!important}' }).catch(() => {});

for (const [name, base] of [['ref', REF], ['loc', LOC]]) {
  // --- desktop card hover (first card) + nav hover
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);
  await hideBadge(page);
  await page.evaluate(() => scrollTo(0, 560));
  await page.waitForTimeout(500);
  await page.mouse.move(700, 850);
  await page.mouse.move(240, 300, { steps: 6 });
  await page.waitForTimeout(120);
  await page.screenshot({ path: `${OUT}/${name}_card_120ms.png`, clip: { x: 0, y: 80, width: 480, height: 540 } });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${name}_card_hover.png`, clip: { x: 0, y: 80, width: 480, height: 540 } });
  await page.mouse.move(120, 35, { steps: 4 });
  await page.waitForTimeout(90);
  await page.screenshot({ path: `${OUT}/${name}_nav_90ms.png`, clip: { x: 0, y: 20, width: 200, height: 40 } });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${name}_nav_hover.png`, clip: { x: 0, y: 20, width: 200, height: 40 } });
  // ticker speed on all-works
  await page.goto(base + '/all-works', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  const pos = () => page.evaluate(() => {
    const el = [...document.querySelectorAll('p')].find((p) => p.textContent.trim().toLowerCase() === 'georgia');
    return el.getBoundingClientRect().y;
  });
  const a = await pos(); await page.waitForTimeout(2000); const b = await pos();
  console.log(name, 'all-works ticker px/s', ((a - b) / 2).toFixed(1));
  await page.close();

  // --- mobile menu
  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await m.goto(base + '/', { waitUntil: 'networkidle' });
  await m.waitForTimeout(3500);
  await hideBadge(m);
  await m.getByText('MENU', { exact: false }).first().click();
  await m.waitForTimeout(150);
  await m.screenshot({ path: `${OUT}/${name}_menu_150.png` });
  await m.waitForTimeout(1200);
  await m.screenshot({ path: `${OUT}/${name}_menu_open.png` });
  await m.close();
}
await browser.close();
