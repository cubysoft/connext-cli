import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import ora from 'ora';
import { logoPath, byePath } from '../icon/route.js';
import { cleanup } from '../bin/cleanup.js';

export async function cleanupResources() {
  for (const c of cleanup.reverse()) {
    await c();
  }
}

export async function createProject(projectType) {
  const projectName = await inquirer.prompt({
    type: 'input',
    name: 'projectName',
    message: 'Ingresa el nombre del proyecto:',
    validate: input => input ? true : 'El nombre del proyecto no puede estar vacío.',
  });

  const projectPath = path.join(process.cwd(), projectName);

  try {
    fs.mkdirSync(projectPath, { recursive: true });
  } catch (error) {
    console.error(`⚠️ Error al crear el proyecto: ${error.message}`);
    return;
  }

  try {
    copyTemplateFiles(projectPath, projectType);
  } catch (error) {
    console.error(`⚠️ Error al copiar archivos de plantilla: ${error.message}`);
    return;
  }

  try {
    await installDependencies(projectPath);
    console.log(`🎊 ¡Proyecto ${projectName} listo!`);
  } catch (error) {
    console.error(`⚠️ Error durante la instalación de dependencias: ${error.message}`);
  } finally {
    console.log('Finalizando el proceso.');
    process.exit(0); // Cerrar el proceso automáticamente
  }
}


export function copyTemplateFiles(projectPath, templatePath) {
  // console.log(`Intentando copiar archivos de la plantilla: ${templatePath}`);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`La plantilla '${templatePath}' no existe.`);
  }

  fs.readdirSync(templatePath).forEach(file => {
    const srcFile = path.join(templatePath, file);
    const destFile = path.join(projectPath, file);

    try {
      fs.copyFileSync(srcFile, destFile);
      console.log(`✔️ Copiado: ${file}`);
    } catch (error) {
      console.error(`⚠️ Error al copiar ${file}: ${error.message}`);
    }
  });
}

export function installDependencies(projectPath) {
  return new Promise((resolve, reject) => {
    const spinner = ora('Instalando dependencias...').start();
    exec('npm install', { cwd: projectPath }, (error, stdout) => {
      if (error) {
        spinner.fail(`⚠️ Error al instalar dependencias: ${error.message}`);
        reject(error);
        return;
      }
      spinner.succeed('Dependencias instaladas.');
      console.log(stdout);
      resolve();
    });
  });
}

export function displayAsciiLogo() {
  if (fs.existsSync(logoPath)) {
    const logo = fs.readFileSync(logoPath, 'utf8');
    const gradientLogo = gradient(['#00aaff', '#aa00ff']);
    console.log(gradientLogo.multiline(logo));
  } else {
    console.error('⚠️ No se encontró el archivo logo.txt en la ubicación especificada.');
  }
}

export async function exitWithDecoration() {
  console.clear();

  let byeMessage;
  try {
    byeMessage = fs.readFileSync(byePath, 'utf8');
  } catch (error) {
    console.error('⚠️ No se pudo leer el archivo de despedida:', error.message);
    byeMessage = '¡Gracias por usar Connext CLI! Adiós!';
  }

  const gradientBye = gradient(['#ff6600', '#ff0066']);
  console.log(gradientBye.multiline(byeMessage));
  console.log('¡Gracias por usar Connext CLI!');
  process.exit(0);
}
