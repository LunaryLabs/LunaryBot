import { Lunary } from '$lib/Client.js'
import { EnvLoader } from '$lib/EnvLoader.js';

EnvLoader();

let client = new Lunary();
console.log(`[LunaryLabs] bot iniciado com sucesso!`);
export default client