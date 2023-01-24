import {
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { ICommand } from '$types/Command'

class Sexo implements ICommand {
  data: SlashCommandBuilder;

  constructor() {    
    this.data = new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Return with Pong!');
  }

  async runner(interaction: CommandInteraction): Promise<any> {
    interaction.reply(`yes, sexo!`);
  }
};

export default Sexo;