import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { ICommand } from '$types/Command'

export class Command implements ICommand {
  data: SlashCommandBuilder;
  
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Return with an ping!');
  }

  async runner(interaction: CommandInteraction): Promise<any> {
    interaction.reply(`${interaction.client.ws.ping}ms!`);
  }
};

export default Command;