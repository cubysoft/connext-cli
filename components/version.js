// components/version.js
import fs from 'fs';
import path from 'path';
import gradient from 'gradient-string';
import { versionPath } from '../icon/route.js'; // Importar la ruta desde route.js

export function displayVersion() {
  let logo = '';

  if (fs.existsSync(versionPath)) {
    logo = fs.readFileSync(versionPath, 'utf8');
  }

  const gradientLogo = gradient(['#00aaff', '#aa00ff']);
  console.log(gradientLogo.multiline(logo));
}
