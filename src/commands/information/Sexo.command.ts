import { ChatInputCommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx'

@Discord()
export abstract class SexoCommand {
  @Slash({
    name: 'sexo',
    description: '|:',
    dmPermission: true
  })
  async Handler(interaction: ChatInputCommandInteraction): Promise<any> {
    await interaction.deferReply();
    await interaction.editReply(`yes, sexo!`);
  }
};
