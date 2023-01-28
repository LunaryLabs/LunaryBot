// Load Events and Commands
import '$helpers/CommandHelper.js';
import '$helpers/EventHelper.js';

import { Lunary } from '$structures/Client.js';
// Load Env
import { config } from 'dotenv';

config()

export const lunary = new Lunary();
export default lunary
