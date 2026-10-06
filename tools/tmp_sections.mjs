import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5173/about', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
console.log(await p.evaluate(() => [...document.querySelectorAll('.about > *, footer, .credits, .list-title, .awards, .award-logo, .award-text, .outro-text, .outro-image-wrap, .team-img-wrap, .team-title')].map(e => { const r = e.getBoundingClientRect(); return e.className + ' ' + Math.round(r.y + scrollY) + ' h' + Math.round(r.height); }).join('\n')));
await b.close();
