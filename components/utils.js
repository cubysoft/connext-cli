// components/utils.js

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import gradient from 'gradient-string';
import { logoPath, byePath } from '../icon/route.js';

// Función para copiar archivos desde la plantilla
export function copyTemplateFiles(projectPath, projectType) {
  const templatePath = path.join(process.cwd(), 'templates', projectType);
  fs.readdirSync(templatePath).forEach(file => {
    const srcFile = path.join(templatePath, file);
    const destFile = path.join(projectPath, file);
    fs.copyFileSync(srcFile, destFile);
  });
}

// Función para instalar dependencias
export function installDependencies(projectPath) {
  return new Promise((resolve, reject) => {
    exec('npm install', { cwd: projectPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`⚠️ Error al instalar dependencias: ${error.message}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
}

// Función para mostrar el logo ASCII con gradiente
export function displayAsciiLogo() {
  if (fs.existsSync(logoPath)) {
    const logo = fs.readFileSync(logoPath, 'utf8');
    const gradientLogo = gradient(['#00aaff', '#aa00ff']);
    console.log(gradientLogo.multiline(logo));
  } else {
    console.error('⚠️ No se encontró el archivo logo.txt en la ubicación especificada.');
  }
}

// Array para funciones de limpieza
export const cleanup = [];

// Función para limpiar recursos
export async function cleanupResources() {
  for (const c of cleanup.reverse()) {
    await c();
  }
}

// Función para salir con un mensaje decorado
export async function exitWithDecoration() {
  console.clear();
  
  // Lee el mensaje de despedida desde el archivo
  let byeMessage;
  try {
    byeMessage = fs.readFileSync(byePath, 'utf8');
  } catch (error) {
    console.error('⚠️ No se pudo leer el archivo de despedida:', error.message);
    byeMessage = '¡Gracias por usar Connext CLI! Adiós!';
  }

  // Muestra el mensaje con un gradiente
  const gradientBye = gradient(['#ff6600', '#ff0066']);
  console.log(gradientBye.multiline(byeMessage));
  
  console.log('¡Gracias por usar Connext CLI!');
  await cleanupResources();
  process.exit(0);
}
