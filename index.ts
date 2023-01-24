import { Lunary } from '$lib/Client.js'
import { EnvLoader } from '$lib/EnvLoader.js';

EnvLoader();



const client = new Lunary();
await client.login();
console.log(`[LunaryLabs] bot iniciado com sucesso!`);