import { ArgsOf, Client, Discord, Once } from 'discordx';

import { pino } from '$lib/Logger.js';
import { pClient } from '$database/prisma.js';

@Discord()
export abstract class Ready {
  @Once({ event: 'ready' })
  async Handle([_]: ArgsOf<'ready'>, client: Client) {
    // Make sure all guilds are cached
    this.syncGuilds(client);

    // Synchronize applications commands with Discord
    this.syncCommands(client);

    // Clear Commands
    // this.clearCommands(client);

    // Connect to database
    await this.databaseConnect();

    // When connected
    pino.info(`[*] Connected to the gateway as ${client.user?.tag}`);
  }

  // Sync Guilds
  syncGuilds(client: Client) {
    // WARN
    pino.warn('[!] Synchronizing guilds...');

    // Fetch Guilds
    client.guilds.fetch()
      .then(() => pino.info('[*] Synchronized guilds...'))
      .catch(() => pino.error('[!!] Error when synchronizing guilds...'));
  }

  // Sync Commands
  syncCommands(client: Client) {
    // WARN
    pino.warn('[!] Synchronizing global commands...');

    // Init App Commands Guilds
    client.initApplicationCommands()
      .then(() => pino.info('[*] Synchronized global commands...'))
      .catch(() => pino.error('[!!] Error when synchronizing global commands...'));
  }

  async clearCommands(client: Client) {
    // Clear Application Commands
    await client.clearApplicationCommands(
      ...client.guilds.cache.map((g) => g.id)
    );
  }

  async databaseConnect() {
    // WARN
    pino.warn('[!] Connecting to Database')

    // Init App Commands Guilds
    await pClient.$connect()
      .then(() => pino.info('[*] Connected to Database...'))
      .catch(() => pino.error('[!!] Error when connecting to Database'));
  }
}
