import { Client } from 'discordx'
import { LunaryIntentsBits, LunaryPartials, LunaryActivityType }  from '$types/types.lunary';

export class Lunary {
  private token: string;
  public client: Client;

  constructor() {
    this.token = String(process.env['TOKEN']);

    this.client = new Client({
      // To use only guild command
      // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

      // Discord intents
      intents: [
        LunaryIntentsBits.all
      ],

      // Discord partials
      partials: LunaryPartials,

      // Bot Presense
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
      silent: false,
    });

    this.client.login(this.token);
  }
}
