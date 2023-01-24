import { ActivityType } from 'discord.js'
import { Discord, ArgsOf, Once, Client } from 'discordx';

import { pino } from '$lib/Logger';

@Discord()
export abstract class ReadyEvent {
  @Once({ event: 'ready' })
  async Handle([_]: ArgsOf<'ready'>, client: Client) {
    client.user?.setPresence({
      activities: [{ name: `Lunary Labs`, type: ActivityType.Watching }],
      status: 'dnd',
    });
    
    pino.info('[*] Bot ONLINE!');
  }
}