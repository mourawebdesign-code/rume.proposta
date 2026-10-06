import { chromium } from 'playwright';
const B = 'https://apexfilms.framer.website';
const browser = await chromium.launch();
const log = (...a) => console.log(...a);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// ---- all-works row hover (real pointer movement)
await page.goto(B + '/all-works', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
const rows = await page.evaluate(() => [...document.querySelectorAll('[data-framer-name="Project"]')].map(p => { const r = p.querySelector('[data-framer-name="Title"]').getBoundingClientRect(); return [p.textContent.slice(0, 12), r.x + r.width / 2, r.y + r.height / 2]; }).filter(r => r[2] > 400 && r[2] < 800));
log('rows', rows);
const [, hx, hy] = rows[0];
await page.mouse.move(hx - 40, hy - 5, { steps: 5 });
await page.mouse.move(hx, hy, { steps: 5 });
const hoverState = () => page.evaluate(() => [...document.querySelectorAll('[data-framer-name="Project"]')].map(p => {
  const v = p.querySelector('[data-framer-name="Video Wrapper"]'); const vr = v.getBoundingClientRect();
  const t = p.querySelector('[data-framer-name="Title"] p'); const c = p.querySelector('[data-framer-name="Category"] h3');
  const vo = getComputedStyle(v).opacity;
  return vo !== '0' ? `${t.textContent} vidOp${vo} vid:${Math.round(vr.x)},${Math.round(vr.y)} ${Math.round(vr.width)}x${Math.round(vr.height)} tf:${getComputedStyle(v).transform} title:${getComputedStyle(t).color} cat:${getComputedStyle(c).color}` : null;
}).filter(Boolean).concat(['others title:' + getComputedStyle(document.querySelectorAll('[data-framer-name="Title"] p')[0]).color]));
for (const ms of [60, 150, 300, 600]) { await page.waitForTimeout(ms === 60 ? 60 : ms - 60); log('hover', ms, await hoverState()); }
await page.mouse.move(hx + 60, hy + 10, { steps: 5 });
await page.waitForTimeout(300);
log('hover moved +60', await hoverState());
await page.screenshot({ path: 'tools/ref/probe_allworks_hover.png' });
await page.mouse.move(20, 500, { steps: 3 });
await page.waitForTimeout(700);
log('unhover', await hoverState());

// ---- footer small link hover + big
const fl = page.locator('a:has-text("Instagram")').first();
await fl.scrollIntoViewIfNeeded();
const fstate = () => page.evaluate(() => { const a = [...document.querySelectorAll('a')].find(x => x.textContent.trim() === 'Instagram'); const cs = getComputedStyle(a); return `color ${cs.color} tf ${cs.transform} deco ${cs.textDecorationLine} op ${cs.opacity} parentTf ${getComputedStyle(a.parentElement).transform} html ${a.parentElement.parentElement.outerHTML.slice(0, 400)}`; });
log('footer before', await fstate());
await fl.hover(); await page.waitForTimeout(400);
log('footer hover', await fstate());

// ---- home logo + outro in-view
await page.goto(B + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(3500);
const logo = () => page.evaluate(() => { const l = document.querySelector('[data-framer-name="APEX_FILMS_LOGO"]'); return getComputedStyle(l).opacity + ' ' + getComputedStyle(l).transform; });
for (const y of [0, 200, 400, 520, 700]) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(700); log('logo sy', y, await logo()); }
const outroState = () => page.evaluate(() => {
  const g = n => [...document.querySelectorAll(`[data-framer-name="${n}"]`)].map(e => { const cs = getComputedStyle(e); return `op${(+cs.opacity).toFixed(2)} ty${cs.transform === 'none' ? 0 : cs.transform.split(',')[13]}`; }).join(' ; ');
  const tr = document.querySelector('[data-framer-name="Top Row"]');
  return `text[${g('Breathe life into your ideas')}] img[${g('Image Wrapper')}] rowOverflow ${getComputedStyle(tr).overflow}`;
});
await page.evaluate(() => scrollTo(0, 1500)); await page.waitForTimeout(500);
log('outro before', await outroState());
const top = await page.evaluate(() => document.querySelector('[data-framer-name="Section Outro"]').getBoundingClientRect().top + scrollY);
await page.evaluate(t => scrollTo(0, t - 700), top);
const t0 = Date.now();
for (let i = 0; i < 14; i++) { await page.waitForTimeout(100); log('outro', Date.now() - t0, await outroState()); }
// footer bottom row hover state for big text?
await browser.close();
