import { SlashCommandBuilder, CommandInteraction } from 'discord.js'
class Command {
  data: SlashCommandBuilder
  
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('uptime')
      .setDescription('my uptime')
  }
  
  async runner(interaction: CommandInteraction): Promise<any> {
    interaction.reply(`<t:${~~((Date.now() - interaction.client.uptime) / 1000)}> (<t:${~~((Date.now() - interaction.client.uptime) / 1000)}:R>)`)
    console.log(interaction.client.uptime)
  }
}
export default Command;
