// components/logos.js

import gradient from 'gradient-string';
import { logoPath, byePath } from '../icon/route.js';
import fs from 'fs';

export function displayLogo() {
  const gradientLogo = gradient(['#00aaff', '#aa00ff']);
  if (fs.existsSync(logoPath)) {
    const logo = fs.readFileSync(logoPath, 'utf8');
    console.log(gradientLogo.multiline(logo));
  } else {
    console.error('⚠️ No se encontró el archivo logo.txt en la ubicación especificada.');
  }
}

export async function displayBye() {
  const byeMessage = fs.existsSync(byePath) 
    ? fs.readFileSync(byePath, 'utf8') 
    : '¡Gracias por usar Connext CLI! Adiós!';
  console.log(gradient(['#ff6600', '#ff0066']).multiline(byeMessage));
}
