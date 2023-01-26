import { dirname, importx } from '@discordx/importer';

import { Lunary } from '$lib/Client.js';
import { config } from 'dotenv';
import { join } from 'node:path';
import { perfData } from '$lib/Common';
import { performance } from 'node:perf_hooks';

const start = performance.now();
perfData.set('start', start)

config();

await importx(join(dirname(import.meta.url), '..', '**', '*.{event,command}.js')) //teste

export const lunary = new Lunary();
export default lunary
