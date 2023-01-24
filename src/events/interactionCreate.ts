import { ClientEvents } from 'discord.js'
import { ArgsOf } from '$types/Common'

export class Command {
  event: keyof ClientEvents;
  
  constructor() {
    this.event = 'interactionCreate';
  }
  
  async runner([interaction]: ArgsOf<'interactionCreate'>): Promise<void> {
    
  }
}