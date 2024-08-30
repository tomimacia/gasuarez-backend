export const cleanData = (data) => {
  console.log('Cleaning data');
  const cleanedData = { ...data };

  // Función para convertir a número y limpiar caracteres no numéricos
  const convertToNumber = (value) => {
    if (typeof value === 'string') {
      // Eliminar caracteres no numéricos excepto el punto decimal y la coma
      return parseFloat(value.replace(/[^0-9.,]/g, '').replace(',', '.'));
    }
    return null;
  };
  const convertToBoolean = (value) => {
    if (value === 'Si') return true;
    if (value === 'No') return false;
    return value;
  };
  // Convertir y limpiar valores si existen
  if (cleanedData.Precio)
    cleanedData.Precio = convertToNumber(cleanedData.Precio);
  if (cleanedData.ALQUILER) {
    // Mantener el formato original de ALQUILER
    cleanedData.ALQUILER = cleanedData.ALQUILER;
  }
  if (cleanedData.VENTA)
    cleanedData.VENTA = convertToNumber(cleanedData.VENTA) * 1000; // Corregir la conversión
  if (cleanedData.Superficiecubierta)
    cleanedData.Superficiecubierta = convertToNumber(
      cleanedData.Superficiecubierta
    );
  if (cleanedData.Ambientes)
    cleanedData.Ambientes = convertToNumber(cleanedData.Ambientes);
  if (cleanedData.Dormitorios)
    cleanedData.Dormitorios = convertToNumber(cleanedData.Dormitorios);
  if (cleanedData.Baños) cleanedData.Baños = convertToNumber(cleanedData.Baños);
  if (cleanedData.Plantas)
    cleanedData.Plantas = convertToNumber(cleanedData.Plantas);
  if (cleanedData.Expensas)
    cleanedData.Expensas = convertToNumber(cleanedData.Expensas);
  if (cleanedData.Cubierta)
    cleanedData.Cubierta = convertToNumber(cleanedData.Cubierta);
  if (cleanedData.Descubierta)
    cleanedData.Descubierta = convertToNumber(cleanedData.Descubierta);
  if (cleanedData.Aptoprofesional)
    cleanedData.Aptoprofesional = convertToBoolean(cleanedData.Aptoprofesional);
  if (cleanedData.Cloaca)
    cleanedData.Cloaca = convertToBoolean(cleanedData.Cloaca);

  // Convertir años a número
  if (cleanedData['Antigüedad'])
    cleanedData['Antigüedad'] = parseInt(
      cleanedData['Antigüedad'].replace(/\D/g, '')
    );

  return cleanedData;
};
