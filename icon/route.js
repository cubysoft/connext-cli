import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el equivalente a __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para obtener la ruta absoluta de un archivo en la carpeta icon
export const getIconPath = (fileName) => path.join(__dirname, fileName);

// Exportar rutas específicas para los archivos .txt
export const logoPath = getIconPath('logo.txt');
export const byePath = getIconPath('bye.txt');
export const versionPath = getIconPath('version.txt');
