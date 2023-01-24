import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { ICommand } from '$types/Command'

export class Command implements ICommand {
  data: SlashCommandBuilder;
  
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('sexo')
      .setDescription('Return sexo!');
  }

  async runner(interaction: CommandInteraction): Promise<any> {
    interaction.reply(`yes, sexo!`);
  }
};

export default Command;