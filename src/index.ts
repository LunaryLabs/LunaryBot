import { Lunary } from '$lib/Client.js'
import { EnvLoader } from '$lib/EnvLoader.js';
import { join } from 'node:path';
import { importx, dirname } from '@discordx/importer'


EnvLoader();

await importx(join(dirname(import.meta.url), '..', '**', '*.{event,command}.js'))

export const lunary = new Lunary();
export default lunary
