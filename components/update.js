//components/update.js

import { exec } from 'child_process';
import ora from 'ora';

// Función para actualizar todas las dependencias
export function updateDependencies() {
  return new Promise((resolve, reject) => {
    const projectPath = process.cwd();
    const spinner = ora('Actualizando dependencias...').start();

    exec('npm update', { cwd: projectPath }, (error, stdout, stderr) => {
      if (error) {
        spinner.fail(`⚠️ Error al actualizar dependencias: ${error.message}`);
        reject(error);
        return;
      }
      spinner.succeed('Dependencias actualizadas.');
      console.log(stdout);
      resolve();
    });
  });
}
