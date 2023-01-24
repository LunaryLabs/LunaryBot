import { ClientEvents, Message } from 'discord.js'

export class Command {
  event: keyof ClientEvents;
  
  constructor() {
    this.event = 'messageCreate';
  }
  
  async runner(message: Message): Promise<void> {
    if(message.author.bot) return;
    message.reply('fodase')
  }
}