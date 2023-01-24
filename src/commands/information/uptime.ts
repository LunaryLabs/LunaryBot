import { SlashCommandBuilder, CommandInteraction } from 'discord.js'

import moment from 'moment'

class Command {
  data: SlashCommandBuilder
  
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('uptime')
      .setDescription('my uptime')
  }
  
  async runner(interaction: CommandInteraction): Promise<any> {
    const uptime = moment.duration(interaction.client.uptime)
    interaction.reply(`> ${uptime}`)
  }
}
export default Command;
