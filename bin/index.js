#!/usr/bin/env node
// bin/index.js
import { select, input } from '@inquirer/prompts';
import { displayHelp } from '../components/help.js';
import { updateDependencies } from '../components/update.js';
import { displayVersion } from '../components/version.js';
import { cleanupResources, exitWithDecoration, displayAsciiLogo } from '../components/utils.js';
import { createProject } from './create.js';
import { WebSocketProvider } from 'ethers';
import chalk from 'chalk';
import gradient from 'gradient-string';
import { fileURLToPath } from 'url';
import path from 'path';

// Obtener el directorio equivalente a __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manejar la señal de ctrl + c
process.on('SIGINT', async () => {
  await exitWithDecoration();
});

process.on('SIGTERM', async () => {
  await exitWithDecoration();
});

async function main() {
  console.clear();

  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    displayHelp();
    return;
  }

  if (process.argv.includes('--version') || process.argv.includes('-v')) {
    displayVersion();
    return;
  }

  if (process.argv.includes('update')) {
    try {
      await updateDependencies();
      return;
    } catch (error) {
      console.error('⚠️ Ocurrió un error al actualizar las dependencias:', error.message);
      process.exit(1);
    }
  }

  if (process.argv.includes('create')) {
    try {
      displayAsciiLogo();
      const gradientText = gradient(['#00aaff', '#aa00ff'])('version 1.0.4');
      console.log(gradientText);

      let provider;
      try {
        provider = new WebSocketProvider('wss://ethereum-sepolia-rpc.publicnode.com');
      } catch (error) {
        console.error('⚠️ Error al crear el WebSocket provider:', error.message);
        return;
      }

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
      return;
    } catch (error) {
      console.error('⚠️ Ocurrió un error:', error.message);
      await cleanupResources();
      process.exit(1);
    }
  }

  console.log('⚠️ Comando no reconocido. Usa --help para ver las opciones disponibles.');
  process.exit(1);
}

main().catch(console.error);
