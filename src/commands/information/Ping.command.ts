import { Discord, Slash } from 'discordx';

import { ChatInputCommandInteraction } from 'discord.js';

@Discord()
export abstract class Ping {
  @Slash({
    name: 'ping',
    description: 'Return with Pong!',
    dmPermission: true
  })
  async Handler(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    await interaction.editReply(`${interaction.client.ws.ping}ms!`);
  }
}
