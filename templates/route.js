import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el equivalente a __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para obtener la ruta de una plantilla específica
export const getTemplatePath = (templateName) => path.join(__dirname, templateName);

// Exportar rutas específicas para cada tipo de plantilla
export const basicHtmlPath = getTemplatePath('basic-html');
export const basicJsPath = getTemplatePath('basic-js');
export const basicTsPath = getTemplatePath('basic-ts');

// Función para obtener todos los tipos de plantillas disponibles
export const getAllTemplatePaths = () => {
  return [basicHtmlPath, basicJsPath, basicTsPath];
};
