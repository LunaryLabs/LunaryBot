import {
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js'
import { ICommand } from '$types/Command'
import moment from 'moment'

class Uptime implements ICommand {
  data: SlashCommandBuilder;

  constructor() {    
    this.data = new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Return with Pong!');
  }
  
  async runner(interaction: CommandInteraction): Promise<any> {
    const uptime = moment.duration(interaction.client.uptime)
    interaction.reply(`> ${uptime}`)
  }
}
export default Uptime;
