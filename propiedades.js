import puppeteer from 'puppeteer';
import { getPropData } from './getPropData.js';
export const propiedades = async (req, res) => {
  const { url } = req.query;
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
  try {
    const [page] = await browser.pages();
    await page.setViewport({ width: 1366, height: 766 });
    const data = await getPropData(url, page);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error fetching property data');
  } finally {
    await browser.close();
  }
};
