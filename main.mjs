import puppeteer from 'puppeteer';
import env from './env';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${Buffer.from(`${env.id}:${env.pass}`).toString('base64')}`,
  });
  await page.goto(`${env.url}`);
  await page.waitForSelector('#searchResultList > li:nth-child(1) > div > a');

  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
