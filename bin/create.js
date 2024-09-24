import fs from 'fs';
import path from 'path';
import { getAllTemplatePaths } from '../templates/route.js';
import { installDependencies, copyTemplateFiles } from '../components/utils.js';
import inquirer from 'inquirer';
import ora from 'ora';

export async function createProject(projectType) {
  const { projectName } = await inquirer.prompt({
    type: 'input',
    name: 'projectName',
    message: 'Ingresa el nombre del proyecto:',
    default: 'my-app',
  });

  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath) && fs.readdirSync(projectPath).length > 0) {
    console.error(`❌ No se puede crear el proyecto: la carpeta ${projectName} contiene archivos.`);
    process.exit(1);
  }

  const spinner = ora('Creando carpeta del proyecto...').start();
  fs.mkdirSync(projectPath, { recursive: true });
  spinner.succeed('Carpeta creada.');

  spinner.start('Creando estructura de archivos...');
  const templatesPaths = getAllTemplatePaths();
  const selectedTemplatePath = templatesPaths.find(templatePath => templatePath.endsWith(projectType));

  if (selectedTemplatePath) {
    try {
      copyTemplateFiles(projectPath, selectedTemplatePath);
      spinner.succeed('Estructura creada.');
    } catch (error) {
      console.error(`⚠️ ${error.message}`);
      process.exit(1);
    }
  } else {
    console.error(`⚠️ No se encontró la plantilla para el tipo ${projectType}.`);
    process.exit(1);
  }

  await installDependencies(projectPath);
  console.log(`🎊 ¡Proyecto ${projectName} listo!`);

  process.exit(0); // Cerrar el proceso automáticamente
}
