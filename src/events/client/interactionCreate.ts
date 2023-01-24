import { ClientEvents, Events, Interaction } from 'discord.js'
import { ArgsOf } from '$types/Common'
import { IEvent } from '$types/Event'
import lunary from '$/index.js'
class Event implements IEvent {
  event: keyof ClientEvents;
  
  constructor() {
    this.event = Events.InteractionCreate;
  }
  
  async runner(interaction: Interaction): Promise<void> {
    if (interaction.isChatInputCommand()) {
      const command = lunary.commands.find(cmd => cmd.data.name === interaction.commandName)
      await command?.runner(interaction)
    }
  }
}
export default Event;
