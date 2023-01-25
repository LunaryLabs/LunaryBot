import { ActivityType } from 'discord.js'
import { Discord, ArgsOf, Once, Client } from 'discordx';

import { pino } from '$lib/Logger'; //logger

@Discord()
export abstract class ReadyEvent {
  @Once({ event: 'ready' })
  async Handle([_]: ArgsOf<'ready'>, client: Client) {
    // Make sure all guilds are cached
    pino.warn('[!] Synchronizing guilds...');

    try {
      const syncGuildSuccess = '[*] Synchronized guilds...';

      // Fetch Guilds
      await client.guilds.fetch();

      // Log success
      pino.info(syncGuildSuccess);
    } catch (err) {
      const syncGuildFail = '[!!] Error when synchronizing guilds...';

      // Log fail
      pino.error(syncGuildFail);
    }

    // Synchronize applications commands with Discord
    pino.warn('[!] Synchronizing global commands...');

    try {
      const syncCommandsSuccess = '[*] Synchronized global commands....';

      // Init App Commands Guilds
      await client.initApplicationCommands();

      // Log success
      pino.info(syncCommandsSuccess);
    } catch (err) {
      const syncCommandsFail = '[!!] Error when synchronizing global commands...';

      // Log fail
     pino.error(syncCommandsFail);
    }

    // To clear all guild commands, uncomment this line,
    // This is useful when moving from guild commands to global commands
    // It must only be executed once

    //  await client.clearApplicationCommands(
    //    ...client.guilds.cache.map((g) => g.id)
    //  ),

    // When connected
    pino.info(`[*] Connected to the gateway as ${client.user?.tag}`);
  }
}
