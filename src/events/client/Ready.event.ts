import { ActivityType } from 'discord.js'
import { Discord, ArgsOf, Once, Client } from 'discordx';

import { pino } from '$lib/Logger';

@Discord()
export abstract class ReadyEvent {
  @Once({ event: 'ready' })
  async Handle([_]: ArgsOf<'ready'>, client: Client) {
    client.user?.setPresence({
      activities: [{ name: `LunaryLabs`, type: ActivityType.Watching }],
      status: 'dnd',
    });

    await client.initApplicationCommands()
    
    pino.info('[*] Bot ONLINE!');
  }
}