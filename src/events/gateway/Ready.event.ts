import { ArgsOf, Client, Discord, Once } from 'discordx';

import { pClient } from '$database/Prisma.js';
import { pino } from '$structures/Logger.js';
import { sentry } from '$structures/Sentry.js';
import { DeepNonNullable } from '$types/Common';

@Discord()
export abstract class Ready {
  @Once({ event: 'ready' })
  async Handle(
    [_]: ArgsOf<'ready'>,
    client: DeepNonNullable<Client>
  ) {
    // Make sure everything is update
    await Promise.all([
      // Make sure all guilds are cached
      this.syncGuilds(client),

      // Synchronize applications commands with Discord
      this.syncCommands(client),

      // Connect to database
      this.databaseConnect()
    ]);

    // When connected
    pino.info(`\u2713 Connected to the gateway! (${process.pid})`);
  }

  // Sync Guilds
  async syncGuilds(client: DeepNonNullable<Client>) {
    // WARN's the user
    pino.warn('\u25C6 Synchronizing guilds..');

    try {
      // Fetch Guilds
      await client.guilds.fetch();

      // Log's back to the user
      pino.info('\u2713 Synchronized guilds!');
    } catch (err) {
      // Log's back to the user the error
      pino.error('\u2717 Error when synchronizing guilds: ', err);

      // And send to Sentry
      sentry.captureException(err);
    }
  }

  // Sync Commands
  async syncCommands(client: DeepNonNullable<Client>) {
    // WARN's the user
    pino.warn('\u25C6 Synchronizing global commands..');

    try {
      // Init Application Commands
      await client.initApplicationCommands();

      // Log's back to the user
      pino.info('\u2713 Synchronized global commands!');
    } catch (err) {
      // Log's back to the user the error
      pino.error('\u2717 Error when synchronizing global commands: ', err);

      // And send to Sentry
      sentry.captureException(err);
    }
  }

  async databaseConnect() {
    // WARN
    pino.warn('\u25C6 Connecting to Database..')

    try {
      // Connect to The Database
      await pClient.$connect();

      // Log's back to the user
      pino.info('\u2713 Connected to Database!')
    } catch (err) {
      // Log's back to the user the error
      pino.error('\u2717 Error when connecting to Database: ', err);

      // And send to Sentry
      sentry.captureException(err);
    }
  }
}
