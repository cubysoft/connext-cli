//components/promts.js

import { select as inquirerSelect } from '@inquirer/prompts';

// Asegúrate de que el nombre de la función exportada sea 'select'
export async function select(options) {
    return await inquirerSelect(options);
}
