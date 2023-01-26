await import("reflect-metadata");

import { dirname, importx } from '@discordx/importer';

import { Lunary } from '$lib/Client.js';
import { config } from 'dotenv';
import { join } from 'node:path';
import { perfData } from '$lib/Common';
import { performance } from 'node:perf_hooks';

const start = performance.now();
perfData.set('start', start)

config();

const dirBase = join(dirname(import.meta.url), '**')

// Import Command and Events
await importx(
  join(dirBase, '*.event.{ts,js}'),
  join(dirBase, '*.command.{ts,js}')
)

// Import Command and Events
await importx(
  join(dirBase, '*.event.{ts,js}'),
  join(dirBase, '*.command.{ts,js}')
)
export const lunary = new Lunary();
export default lunary
