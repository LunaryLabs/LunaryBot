import { ClientEvents, ActivityType, Events } from 'discord.js'
import { IEvent } from '$types/Event'
import { ArgsOf } from '$types/Common';

import lunary from '$/src/index.js'
import { pino } from '$lib/Logger';

class Ready implements IEvent {
  event: keyof ClientEvents;
  once: boolean;
  
  constructor() {
    this.event = Events.ClientReady;
    this.once = true;
  }
  
  async runner(): Promise<void> {
    lunary.client.user?.setPresence({
      activities: [{ name: `Lunary Labs`, type: ActivityType.Watching }],
      status: 'dnd',
    });

    console.log(lunary.commands)
    await lunary.client.application?.commands.set(lunary.commands.map(c => c.data))
    pino.info('[/] Slash Commands setados com sucesso!')
    pino.info('Bot online!')
  }
}

export default Ready;