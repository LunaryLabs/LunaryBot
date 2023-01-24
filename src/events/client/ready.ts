import { ClientEvents, ActivityType, Events } from 'discord.js'
import lunary from '$/index.js'
import { IEvent } from '$types/Event'

class Event implements IEvent {
  event: keyof ClientEvents;
  
  constructor() {
    this.event = Events.ClientReady;
  }
  
  async runner(): Promise<void> {
    lunary.client.user?.setPresence({
      activities: [{ name: `Lunary Labs`, type: ActivityType.Watching }],
      status: 'dnd',
    }); // VOU SAIR AQUI, ANTES DAR COMMIT, DAQUI A POUCO EU VOLTO

    await lunary.client.application?.commands.set(lunary.commands.map(c => c.data))
    console.log('[/] Slash Commands setados com sucesso!')
    console.log('Bot online!')
  }
}

export default Event;