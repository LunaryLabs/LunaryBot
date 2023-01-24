import {
  ApplicationCommandType,
  CommandInteraction,
  SlashCommandBuilder
} from 'discord.js';
import { ICommand } from '$types/Command'

class Ping implements ICommand {
  data: SlashCommandBuilder;

  constructor() {    
    this.data = new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Return with Pong!');
  }

  async runner(interaction: CommandInteraction): Promise<any> {
    interaction.reply(`${interaction.client.ws.ping}ms!`);
  }
};

export default Ping;