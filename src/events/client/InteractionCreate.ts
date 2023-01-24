import { ClientEvents, Events } from 'discord.js'
import { ArgsOf } from '$types/Common'
import { IEvent } from '$types/Event'

import lunary from '$/src/index.js'

class InteractionCreate implements IEvent {
  event: keyof ClientEvents;
  once: boolean;

  constructor() {
    this.event = Events.InteractionCreate;
    this.once = false;
  }
  
  async runner([interaction]: ArgsOf<'interactionCreate'>): Promise<void> {
    if (interaction.isChatInputCommand()) {
      const command = lunary.commands.find(cmd => cmd.data.name === interaction.commandName)
      await command?.runner(interaction)
    }
  }
}
export default InteractionCreate;
