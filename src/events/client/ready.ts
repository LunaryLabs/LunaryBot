import { ClientEvents } from 'discord.js'
import { ArgsOf } from '$types/Common'

export class Command {
  event: keyof ClientEvents;
  
  constructor() {
    this.event = 'ready';
  }
  
  async runner(): Promise<void> {
    console.log('Bot online!')
  }
}