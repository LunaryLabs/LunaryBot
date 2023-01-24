import { Lunary } from '$lib/Client.js'
import { EnvLoader } from '$lib/EnvLoader.js';
import { pino } from '$lib/Logger'
EnvLoader();

pino.info(`[*] bot iniciado com sucesso!`);

export const lunary = new Lunary();
export default lunary