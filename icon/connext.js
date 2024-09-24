#!/usr/bin/env node
import { select, input } from '@inquirer/prompts';
import { WebSocketProvider } from 'ethers';
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import ora from 'ora';
import { fileURLToPath } from 'url';

// Obtener el directorio equivalente a __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para limpiar recursos
const cleanup = [];
async function cleanupResources() {
  for (const c of cleanup.reverse()) {
    await c();
  }
}

// Función para copiar archivos desde la plantilla
function copyTemplateFiles(projectPath, projectType) {
  const templatePath = path.join(process.cwd(), 'templates', projectType);
  fs.readdirSync(templatePath).forEach(file => {
    const srcFile = path.join(templatePath, file);
    const destFile = path.join(projectPath, file);
    fs.copyFileSync(srcFile, destFile);
  });
}

// Función para instalar dependencias
function installDependencies(projectPath) {
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
function displayAsciiLogo() {
  const logoPath = path.join(__dirname, 'logo.txt');
  const logo = fs.readFileSync(logoPath, 'utf8');
  
  // Aplicar gradiente al logo
  const gradientLogo = gradient(['#00aaff', '#aa00ff']);
  console.log(gradientLogo.multiline(logo));
}

// Función para mostrar un mensaje de despedida con gradiente desde bye.txt
async function exitWithDecoration() {
  console.clear();
  
  const byePath = path.join(__dirname, 'bye.txt');
  if (fs.existsSync(byePath)) {
    const byeMessage = fs.readFileSync(byePath, 'utf8');
    
    // Aplicar gradiente al mensaje de despedida
    const gradientBye = gradient(['#ff6600', '#ff0066']);
    console.log(gradientBye.multiline(byeMessage));
  } else {
    // Si no existe el archivo bye.txt, mostrar un mensaje por defecto
    const exitMessage = figlet.textSync('Adiós!', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    });
    console.log(chalk.redBright(exitMessage));
  }

  console.log(chalk.yellow('¡Gracias por usar Connext CLI!'));
  await cleanupResources();
  process.exit(0);
}

// Función para crear un proyecto básico
async function createProject(projectType) {
  const projectName = await input({
    message: chalk.yellow('Ingresa el nombre del proyecto:'),
    default: 'my-app', // Placeholder por defecto
  });
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    if (fs.readdirSync(projectPath).length > 0) {
      console.error(chalk.red(`❌ No se puede crear el proyecto: la carpeta ${projectName} contiene archivos.`));
      process.exit(1);
    }
  } else {
    const spinner = ora('Creando carpeta del proyecto...').start();
    fs.mkdirSync(projectPath, { recursive: true });
    spinner.succeed('Carpeta creada.');
  }

  const spinner = ora('Creando estructura de archivos...').start();
  // Copiar archivos de la plantilla
  copyTemplateFiles(projectPath, projectType);
  spinner.succeed('Estructura creada.');

  spinner.start('Instalando dependencias...');
  await installDependencies(projectPath);
  spinner.succeed('Dependencias instaladas.');

  spinner.start('Verificando proyecto...');
  // Aquí puedes hacer cualquier otra verificación que necesites
  spinner.succeed('Proyecto verificado.');

  console.log(`🎊 ¡Proyecto ${projectName} listo!`);
}

async function main() {
  console.clear();

  // Mostrar logo con gradiente
  displayAsciiLogo();

  const gradientText = gradient(['#00aaff', '#aa00ff'])('version 1.0.1');
  console.log(gradientText);

  let provider;
  try {
    provider = new WebSocketProvider('wss://ethereum-sepolia-rpc.publicnode.com');
    cleanup.push(() => {
      if (provider && provider._websocket && provider._websocket.readyState === provider._websocket.OPEN) {
        return provider.destroy();
      }
    });
  } catch (error) {
    console.error('⚠️ Error al crear el WebSocket provider:', error.message);
    return;
  }

  process.on('SIGINT', async () => {
    await exitWithDecoration();
  });

  process.on('SIGTERM', async () => {
    await exitWithDecoration();
  });

  try {
    const projectType = await select({
      message: chalk.yellow('Selecciona el tipo de proyecto:'),
      choices: [
        { value: 'basic-html', name: 'HTML' },
        { value: 'basic-js', name: 'JavaScript' },
        { value: 'basic-ts', name: 'TypeScript' },
      ],
    });

    await createProject(projectType);

    await cleanupResources();
    process.exit(0);
  } catch (error) {
    console.error('⚠️ Ocurrió un error:', error.message);
    await cleanupResources();
    process.exit(1);
  }
}

main().catch(console.error);
