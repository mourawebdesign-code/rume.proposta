import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1024, height: 768 } });
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' }); await p.waitForTimeout(3500);
console.log(await p.evaluate(() => ['.home-header','.featured','.featured-item','.card','.card-media','.card-text','.card-title','.outro','.footer','.f-row--1','.f-row--2'].map(s => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return s + ' ' + Math.round(r.x) + ',' + Math.round(r.y + scrollY) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height); }).join('\n')));
await b.close();
