// And import helpers
import '$helpers/Command.js';
import '$helpers/Event.js';
import '$structures/Sentry.js';
import 'dotenv/config';

import { Lunary } from '$structures/Client.js';
export const lunary = new Lunary();
