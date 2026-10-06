import { chromium } from 'playwright';
const B = 'https://apexfilms.framer.website';
const browser = await chromium.launch();
const log = (...a) => console.log(...a);

// ---- all-works ticker + row hover
if (process.env.ALL) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(B + '/all-works', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  const tick = () => page.evaluate(() => {
    const t = document.querySelector('[data-framer-name="Ticker Desktop"]');
    const ul = t.querySelector('ul') || t.firstElementChild;
    const cs = getComputedStyle(t);
    const first = t.querySelector('[data-framer-name="Project"]').getBoundingClientRect();
    return { ulTf: getComputedStyle(ul).transform, mask: cs.maskImage || cs.webkitMaskImage, overflow: cs.overflow, firstY: Math.round(first.y), tag: ul.tagName, html: t.outerHTML.slice(0, 600) };
  });
  log('ticker t0', await tick());
  await page.waitForTimeout(1000);
  log('ticker t1', (await tick()).firstY);
  await page.waitForTimeout(1000);
  log('ticker t2', (await tick()).firstY);
  // hover a row at center
  await page.mouse.move(640, 650);
  await page.waitForTimeout(700);
  log('hover', await page.evaluate(() => [...document.querySelectorAll('[data-framer-name="Project"]')].map(p => {
    const v = p.querySelector('[data-framer-name="Video Wrapper"]'); const r = p.getBoundingClientRect(); const vr = v.getBoundingClientRect();
    const t = p.querySelector('[data-framer-name="Title"] p');
    return getComputedStyle(v).opacity !== '0' || getComputedStyle(t).color !== 'rgb(220, 220, 220)' ? `${t.textContent} y${Math.round(r.y)} vid op${getComputedStyle(v).opacity} ${Math.round(vr.x)},${Math.round(vr.y)} ${getComputedStyle(v).transform} title:${getComputedStyle(t).color}` : null;
  }).filter(Boolean)));
  log('ticker after hover', (await tick()).firstY);
  await page.waitForTimeout(1000);
  log('ticker after hover +1s', (await tick()).firstY);
  await page.screenshot({ path: 'tools/ref/probe_allworks_hover.png' });
  // filter click
  await page.mouse.move(10, 10);
  await page.click('text=Music >> nth=0').catch(e => log('click err', e.message));
  await page.waitForTimeout(1500);
  log('after filter url', page.url());
  await page.screenshot({ path: 'tools/ref/probe_allworks_music.png' });
  await page.close();
}

// ---- project ticker
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(B + '/works/haylou', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  const t = () => page.evaluate(() => {
    const w = document.querySelector('[data-framer-name="Project Image Ticker - Desktop"]');
    const f = w.querySelector('[data-framer-name^="Loop Image Wrapper"]');
    let e = f, chain = [];
    while (e && e !== w.parentElement) { const cs = getComputedStyle(e); if (cs.transform !== 'none' || cs.maskImage !== 'none') chain.push(`${e.getAttribute('data-framer-name') || e.tagName}:${cs.transform} mask:${cs.maskImage}`); e = e.parentElement; }
    return { x: Math.round(f.getBoundingClientRect().x), chain };
  });
  log('proj ticker', await t()); await page.waitForTimeout(1000); log('proj ticker +1s', (await t()).x);
  // nav hover
  const link = page.locator('a[href$="about"]').first();
  await link.hover(); await page.waitForTimeout(80);
  const navS = () => page.evaluate(() => { const a = document.querySelector('a[href$="about"]'); return [...a.querySelectorAll('p')].map(p => Math.round(p.getBoundingClientRect().y) + ' ' + getComputedStyle(p.parentElement).transform).join(' / '); });
  log('nav hover 80ms', await navS()); await page.waitForTimeout(600); log('nav hover 680ms', await navS());
  // page transition: click about and sample
  await page.mouse.move(700, 450);
  const t0 = Date.now();
  await page.click('a[href$="about"]');
  for (let i = 0; i < 6; i++) { await page.waitForTimeout(120); log('nav', Date.now() - t0, page.url(), await page.evaluate(() => getComputedStyle(document.querySelector('#main') || document.body).opacity + ' scrollY' + scrollY)); }
  await page.close();
}

// ---- mobile menu
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto(B + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'tools/ref/probe_m_top.png' });
  await page.getByText('MENU', { exact: false }).first().click().catch(e => log('menu err', e.message));
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'tools/ref/probe_m_menu_150.png' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'tools/ref/probe_m_menu.png' });
  log('menu dump', await page.evaluate(() => [...document.querySelectorAll('nav *, [data-framer-name*="Menu"] *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 1 && r.y < 844 && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()); }).map(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return `${e.textContent.trim()} ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} ${cs.fontFamily.split(',')[0]} ${cs.fontSize} ${cs.color}`; }).join('\n')));
  log('menu containers', await page.evaluate(() => [...document.querySelectorAll('[data-framer-name]')].filter(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.y < 844 && r.width > 300 && cs.backgroundColor !== 'rgba(0, 0, 0, 0)'; }).map(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return `${e.getAttribute('data-framer-name')} ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} bg${cs.backgroundColor} pos${cs.position}`; }).join('\n')));
  await page.close();
}
await browser.close();

