// bin/create.js

import { input } from '@inquirer/prompts';
import ora from 'ora';
import fs from 'fs';
import path from 'path';
import { copyTemplateFiles, installDependencies } from '../components/utils.js';

export async function createProject(projectType) {
  const projectName = await input({
    message: 'Ingresa el nombre del proyecto:',
    default: 'my-app',
  });
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath) && fs.readdirSync(projectPath).length > 0) {
    console.error(`❌ No se puede crear el proyecto: la carpeta ${projectName} contiene archivos.`);
    process.exit(1);
  } else {
    const spinner = ora('Creando carpeta del proyecto...').start();
    fs.mkdirSync(projectPath, { recursive: true });
    spinner.succeed('Carpeta creada.');
  }

  const spinner = ora('Creando estructura de archivos...').start();
  copyTemplateFiles(projectPath, projectType);
  spinner.succeed('Estructura creada.');

  spinner.start('Instalando dependencias...');
  await installDependencies(projectPath);
  spinner.succeed('Dependencias instaladas.');

  console.log(`🎊 ¡Proyecto ${projectName} listo!`);
}
