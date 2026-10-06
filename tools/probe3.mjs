import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://apexfilms.framer.website/works/crisp', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
console.log('crisp color', await page.evaluate(() => getComputedStyle(document.querySelector('h1')).color));
// other-works stack over time
for (let i = 0; i < 4; i++) {
  console.log('other', i, await page.evaluate(() => [...document.querySelectorAll('[data-framer-name="Video Module - Desktop"]')].map((m) => m.innerText.split('\n')[0] + ' op' + getComputedStyle(m).opacity + ' z' + getComputedStyle(m).zIndex + ' vis' + getComputedStyle(m.parentElement).visibility).join(' | ')));
  await page.waitForTimeout(1500);
}
for (const [url, w] of [['http://localhost:5173/', 1440], ['http://localhost:5173/', 390], ['https://apexfilms.framer.website/', 390]]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  console.log(url, w, await page.evaluate(() => {
    const el = document.querySelector('.home-logo svg text') || [...document.querySelectorAll('p')].find((p) => p.textContent === 'APEX FILMS');
    const r = el.getBoundingClientRect();
    return `${Math.round(r.x)},${Math.round(r.y + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}`;
  }));
}
await browser.close();
