import { ActivityType, GatewayIntentBits, Partials } from 'discord.js'
import { join } from 'node:path'
import { Client } from 'discordx'
import { importx, dirname } from '@discordx/importer'

export class Lunary {
  private token: string;
  public client: Client;

  constructor(token?: string) {
    this.token = String(token ?? process.env['TOKEN']);

    this.client = new Client({
      // To use only guild command
      // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

      // Discord intents
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
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

      // Other
      closeTimeout: 10,
      failIfNotExists: true,
      silent: true,
    });

    this.login();
  }

  async login() {
    await this.client.login(this.token);
  }
}