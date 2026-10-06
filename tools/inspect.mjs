// Reference inspection: full-page screenshots + geometry/style dump per page and viewport.
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.argv[2] || 'https://apexfilms.framer.website';
const OUT = process.argv[3] || 'tools/ref';
const pages = (process.argv[4] || '/,/all-works,/about,/contact,/works/haylou').split(',');
const viewports = (process.argv[5] || '1440x900,390x844').split(',').map(v => v.split('x').map(Number));

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

const dump = () => {
  const out = [];
  document.querySelectorAll('body *').forEach(el => {
    if (['SCRIPT', 'STYLE', 'path', 'svg', 'g', 'defs', 'clipPath', 'rect'].includes(el.tagName)) return;
    const name = el.getAttribute('data-framer-name');
    if (name === 'Buy Template Module' || name === 'madeinframer' || el.closest('#__framer-badge-container')) return;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') return;
    const text = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent.trim()).join(' ');
    const media = ['IMG', 'VIDEO'].includes(el.tagName);
    const bg = cs.backgroundColor !== 'rgba(0, 0, 0, 0)';
    if (!(text || media || name || bg || cs.borderRadius !== '0px')) return;
    out.push([
      el.tagName, name ? `[${name}]` : '', text.slice(0, 60),
      `${Math.round(r.x)},${Math.round(r.y + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      text ? `${cs.fontFamily.split(',')[0]} ${cs.fontSize} w${cs.fontWeight} lh${cs.lineHeight} ls${cs.letterSpacing} ${cs.color} ${cs.textTransform} ${cs.textAlign}` : '',
      bg ? 'bg' + cs.backgroundColor : '', cs.borderRadius !== '0px' ? 'r' + cs.borderRadius : '',
      cs.position === 'fixed' || cs.position === 'sticky' ? cs.position : '',
      cs.opacity !== '1' ? 'op' + cs.opacity : '',
      media ? `${el.tagName === 'VIDEO' ? 'video auto:' + el.autoplay : 'img'} ${cs.objectFit} natural:${el.naturalWidth || el.videoWidth}x${el.naturalHeight || el.videoHeight} ${(el.currentSrc || el.src).split('/').pop().slice(0, 50)}` : '',
    ].filter(Boolean).join(' | '));
  });
  return out.join('\n');
};

for (const [w, h] of viewports) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const p of pages) {
    const slug = (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '_')) + `_${w}`;
    await page.goto(BASE + p, { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(3500);
    // scroll through to trigger in-view effects, then back to top
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += Math.round(h * 0.6)) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(250); }
    await page.waitForTimeout(1500);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(800);
    await page.addStyleTag({ content: '#__framer-badge-container,[data-framer-name="Buy Template Module"]{display:none!important}' });
    fs.writeFileSync(`${OUT}/${slug}.txt`, `URL ${page.url()} H=${H}\n` + await page.evaluate(dump));
    await page.screenshot({ path: `${OUT}/${slug}.png`, fullPage: true });
    console.log('done', slug, H);
  }
  await ctx.close();
}
await browser.close();
