import { ArgsOf, Client, Discord, Once } from 'discordx';

import { perfData } from '$lib/Common';
import { performance } from 'node:perf_hooks';
import { pino } from '$lib/Logger';

@Discord()
export abstract class Ready {
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
    const end = performance.now()
    perfData.set('end', end)

    const startTime = ~~perfData.get('start')!;
    const endTime = ~~perfData.get('end')!;

    pino.info(`[*] Connected to the gateway as ${client.user?.tag}`);
    pino.info(`[?] Boot time: ${Math.abs(startTime - endTime)}ms`)
  }
}
