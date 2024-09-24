// components/help.js

import gradient from 'gradient-string';
import { logoPath } from '../icon/route.js'; // Importar la ruta desde route.js
import fs from 'fs';

export function displayHelp() {
  const gradientLogo = gradient(['#00aaff', '#aa00ff']);
  if (fs.existsSync(logoPath)) {
    const logo = fs.readFileSync(logoPath, 'utf8');
    console.log(gradientLogo.multiline(logo));
  } else {
    console.error('⚠️ No se encontró el archivo logo.txt en la ubicación especificada.');
  }

  console.log(
    'Connext es una herramienta CLI para crear y gestionar proyectos de manera eficiente.'
  );

  console.log(
    `Uso: connext [opciones]

    Opciones:
      --help      Muestra este mensaje de ayuda
      -h          Muestra este mensaje de ayuda
      --version   Muestra la versión actual del CLI
      -v          Muestra la versión actual del CLI
      update      Actualiza todas las dependencias del proyecto

    Ejemplos:
      connext create     Crea un nuevo proyecto.
      connext update     Actualiza todas las dependencias.
      connext --help     Muestra este mensaje de ayuda.
      connext --version  Muestra la versión del CLI.

    Versión: v1.0.3

    Soporte:
      Para reportar problemas, visita nuestro repositorio en GitHub: https://github.com/tuusuario/connext-cli

    Licencia:
      Este proyecto está licenciado bajo la MIT License.`
  );
}
