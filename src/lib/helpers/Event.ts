import { dirname, importx } from '@discordx/importer';

import { join } from 'path';

const eventsDir = join(dirname(import.meta.url), '..', '..', 'events', '**', '*.event.{ts,js}');
await importx(eventsDir);
