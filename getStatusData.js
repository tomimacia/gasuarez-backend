export const getStatusData = async (url, page) => {
  console.log('Getting status data');
  await page.goto(url);
  await page.waitForSelector('#min-max-price-container');

  let previousHeight;
  try {
    while (true) {
      // Guarda la altura actual de la página antes del scroll
      previousHeight = await page.evaluate('document.body.scrollHeight');

      // Ejecuta el scroll hasta el final de la página
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');

      // Espera un poco para que se cargue el contenido nuevo
      await page.evaluate(
        () => new Promise((resolve) => setTimeout(resolve, 1000))
      );

      // Comprueba si la altura de la página ha cambiado
      const newHeight = await page.evaluate('document.body.scrollHeight');
      if (newHeight === previousHeight) {
        break; // Si la altura no ha cambiado, significa que no hay más propiedades para cargar
      }
    }
    console.log('No more content to load');
  } catch (error) {
    console.error('Error while scrolling:', error);
  }
  const Propiedades = await page.$$eval('ul#propiedades li', (items) => {
    return items.map((item) => {
      // Extrae el enlace a la propiedad
      const linkElement = item.querySelector('a');
      const Href = linkElement
        ? `https://www.gasuarez.com.ar${linkElement.getAttribute('href')}`
        : '';

      // Extrae la imagen principal
      const imgElement = item.querySelector('.dest-img');
      const imgSrc = imgElement ? imgElement.getAttribute('src') : '';

      // Extrae la descripción
      const tipoUbicacionElement = item.querySelector('.prop-desc-tipo-ub');
      const direccionElement = item.querySelector('.prop-desc-dir');
      const tipoUbicacion = tipoUbicacionElement
        ? tipoUbicacionElement.textContent.trim()
        : '';
      const Titulo = direccionElement
        ? direccionElement.textContent.trim()
        : '';

      // Extrae el precio
      const precioElement = item.querySelector('.prop-valor-nro');
      const precio = precioElement ? precioElement.textContent.trim() : '';
      const finalPrecio = precio ? precio.split('\n')[0] : '';
      // Retorna un objeto con la información de la propiedad
      return {
        Href,
        imgSrc,
        tipoUbicacion,
        Titulo,
        VENTA: Number(finalPrecio.replace('USD', '').replace('.', '')),
      };
    });
  });
  return Propiedades;
};
