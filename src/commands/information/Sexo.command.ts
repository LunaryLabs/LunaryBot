import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx'

@Discord()
export abstract class SexoCommand {
  @Slash({
    name: 'sexo',
    description: '|:',
    dmPermission: true
  })
  async Handler(interaction: CommandInteraction): Promise<any> {
    await interaction.deferReply();
    await interaction.editReply(`yes, sexo!`);
  }
};