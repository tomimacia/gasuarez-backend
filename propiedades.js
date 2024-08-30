import puppeteer from 'puppeteer';
import { getPropData } from './getPropData.js';
export const propiedades = async (res) => {
  const browser = await puppeteer.launch({
    ars: [
      '--disable-setuid-sandobx',
      '--no-sandbox',
      '--single-process',
      '--no-zygote',
    ],
    executablePath:
      process.env.NODE_ENV === 'production'
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  const [page] = await browser.pages();
  await page.setViewport({ width: 1366, height: 766 });
  const url =
    'https://www.gasuarez.com.ar/p/4401474-Casa-en-Venta-en-Adrogue-Portugal-2285-e/Guatambu-y-Carmona';
  console.log('getting data');
  const data = await getPropData(url, page);
  res.send(data);
  await browser.close();
  return data;
};
