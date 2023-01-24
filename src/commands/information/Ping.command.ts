import { CommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx'

@Discord()
export abstract class PingCommand {
  @Slash({
    name: 'ping',
    description: 'Return with Pong!',
    dmPermission: true
  })
  async Handler(interaction: CommandInteraction) {
    await interaction.deferReply();
    await interaction.editReply(`${interaction.client.ws.ping}ms!`);
  }
}