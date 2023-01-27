import { ChatInputCommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx';

@Discord()
export abstract class Uptime {
  @Slash({
    name: 'uptime',
    description: 'Pick bot Uptime!',
    dmPermission: true
  })
  async runner(interaction: ChatInputCommandInteraction): Promise<any> {
    await interaction.deferReply();
    await interaction.editReply(`<t:${~~((Date.now() - interaction.client.uptime) / 1000)}> (<t:${~~((Date.now() - interaction.client.uptime) / 1000)}:R>)`)
  }
}
