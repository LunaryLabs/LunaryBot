import { Client, Discord, Slash } from 'discordx';

import { DeepNonNullable } from '$types/Common';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

@Discord()
export abstract class Uptime {
  @Slash({
    name: 'uptime',
    description: 'Informação » Veja quanto tempo o bot está online!',
    dmPermission: true
  })
  async Handler(
    interaction: ChatInputCommandInteraction,
    client: DeepNonNullable<Client>
  ) {
    // Defer the reply to prevent timeout error's
    await interaction.deferReply({ fetchReply: true });

    // Calculate the Differ
    const differ = (Date.now() - client.uptime) / 1000

    const uptimeEmbed = new EmbedBuilder()
      .setDescription(`Eu estou online <t:${~~differ}:R>, fiquei online em <t:${~~differ}:d>`)
      .setColor(0x2ADE24);

    // Reply's to the user
    await interaction.editReply({ embeds: [uptimeEmbed] });
    return;
  }
}
