import { ClientEvents, ActivityType } from 'discord.js'
import client from '../../../index.js'
export class Command {
  event: keyof ClientEvents;
  
  constructor() {
    this.event = 'ready';
  }
  
  async runner(): Promise<void> {
    console.log('Bot online!')
    client.client.user?.setPresence({
        activities: [{ name: `lunary labs`, type: ActivityType.Watching }],
        status: 'dnd',
      });
  }
}