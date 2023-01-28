import { LunaryActivityType, LunaryIntentsBits, LunaryPartials } from '$types/Lunary.js';

import { Client } from 'discordx';
import { GatewayIntentBits } from 'discord.js';
import { pino } from '$structures/Logger.js';

export class Lunary {
  protected token: string;
  protected intents!: Array<GatewayIntentBits>;
  public client: Client;

  constructor() {
    // Verify if the user is using production or development
    if (process.env['NODE_ENV'] == 'production') {
      // Log in the console
      pino.warn('‼ Loading in production mode');

      // Set Token
      this.token = process.env['TOKEN_MAIN']!;

      // Set Intents
      this.intents = LunaryIntentsBits.main;
    } else {
      // Log in the console
      pino.warn('‼ Loading in development mode');

      // Set Token
      this.token = process.env['TOKEN_CANARY']!;

      // Set Intents
      this.intents = LunaryIntentsBits.canary;
    }

    this.client = new Client({
      // To use only guild command
      // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

      // Discord intents
      intents: this.intents,

      // Discord partials
      partials: LunaryPartials,

      // Bot Presence
      presence: {
        activities: [
          {
            name: 'Lunary Labs',
            type: LunaryActivityType.Watching
          }
        ],
        status: 'dnd'
      },

      // Other
      closeTimeout: 10,
      failIfNotExists: true,
      silent: true,
    });

    this.client.login(this.token);
  }
}
