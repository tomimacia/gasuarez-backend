import { cleanData } from './cleanPage.js';

export const getPropData = async (url, page) => {
  console.log('Getting prop data');
  await page.goto(url);
  await page.waitForSelector('.title-address');
  const href = url;
  const Titulo = await page.$eval('.title-address', (el) => el.textContent);
  console.log(Titulo);
  const detalles = await page.$$eval(
    '#ficha_detalle_cuerpo .ficha_detalle_item',
    (items) => {
      const result = {};
      items.forEach((item) => {
        const labelElement = item.querySelector('b');
        const label = labelElement ? labelElement.textContent.trim() : '';
        const value = item.textContent.replace(label, '').trim();
        if (label) {
          result[label.split(' ').join('')] = value;
        }
      });
      return result;
    }
  );
  const getListaData = async (sectionID) => {
    const data = await page.$$eval(`#${sectionID} .ficha_ul li`, (items) => {
      const result = {};
      items.forEach((item) => {
        const text = item.textContent.trim();
        const [label, value] = text.split(':');
        if (label && value) {
          result[label.trim()] = value.trim();
        }
      });
      return result;
    });
    return data;
  };
  const getOperations = async () => {
    const data = await page.$$eval(
      'div.detalleColorC.operations-box .operation-div',
      (items) => {
        const result = {};
        items.forEach((item) => {
          const typeDiv = item.querySelector('.operation-type-div');
          const valueDiv = item.querySelector('.operation-val span');
          if (typeDiv && valueDiv) {
            const type = typeDiv.textContent.trim();
            const value = valueDiv.textContent.trim();
            result[type] = value;
          }
        });
        return result;
      }
    );
    return data;
  };
  const operations = await getOperations();
  const Images = await page.$$eval('div #mCSB_1_container img', (items) => {
    return items.map((item) => item.getAttribute('data-big')); // Extrae el atributo src de cada imagen
  });
  const basico = await getListaData('ficha_informacion_basica');
  const superficies = await getListaData('ficha_superficies');
  const servicios = await getListaData('ficha_servicios');
  const propData = {
    href,
    Titulo,
    Images,
    ...operations,
    ...detalles,
    ...basico,
    ...superficies,
    ...servicios,
  };
  return cleanData(propData);
};
