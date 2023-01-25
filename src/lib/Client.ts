import { ActivityType, GatewayIntentBits, Partials } from 'discord.js'
import { Client } from 'discordx'

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
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessageReactions,
      ],

      // Discord partials
      partials: [
        Partials.User,
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.ThreadMember,
      ],

      // Bot Presense
      presence: {
        activities: [
          {
            name: 'Lunary Labs',
            type: ActivityType.Watching
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
