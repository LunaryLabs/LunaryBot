import { LunaryActivityType, LunaryIntentsBits, LunaryPartials } from '$types/Lunary.js';

import { Client } from 'discordx';
import { GatewayIntentBits } from 'discord.js';
import { pino } from '$lib/Logger.js';

export class Lunary {
  protected token!: string;
  protected intents!: Array<GatewayIntentBits>;
  public client: Client;

  constructor() {
    switch (process.env["NODE_ENV"]) {
      case 'production':
        pino.info('[*] Loading in production mode')
        this.token = process.env["TOKEN_MAIN"]!
        this.intents = LunaryIntentsBits.main;
        break;

      case 'development':
        pino.info('[*] Loading in development mode')
        this.token = process.env["TOKEN_CANARY"]!
        this.intents = LunaryIntentsBits.canary;
        break;
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
