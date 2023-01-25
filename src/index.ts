import { Lunary } from '$lib/Client.js'
import { config } from 'dotenv'
import { join } from 'node:path';
import { importx, dirname } from '@discordx/importer'

config();

await importx(join(dirname(import.meta.url), '..', '**', '*.{event,command}.js')) //teste

export const lunary = new Lunary();
export default lunary
