import { ChatInputCommandInteraction, EmbedBuilder, RGBTuple } from 'discord.js';
import { Client, Discord, Slash } from 'discordx';

import { colorMixer } from '$lib/helpers/ColorMixer.js';
import { DeepNonNullable } from '$types/Common';

@Discord()
export abstract class Ping {
  @Slash({
    name: 'ping',
    description: 'Returno com Pong!',
    dmPermission: true
  })
  async Handler(
    interaction: ChatInputCommandInteraction,
    client: DeepNonNullable<Client>
  ) {
    const sent = await interaction.deferReply({ fetchReply: true });

    const gatewayPing = Math.abs(client.ws.ping);
    const apiPing = Math.abs(interaction.createdTimestamp - sent.createdTimestamp)

    let gatewayString: string;
    let apiString: string;

    let gColor: RGBTuple = [0, 0, 0];
    let aColor: RGBTuple = [0, 0, 0];

    // Gateway Ping
    switch (true) {
      case (gatewayPing <= 100): {
        gatewayString = `Gateway <:green_ball:1070096909483647066> ${gatewayPing}ms`;
        gColor = [64, 227, 24]
        break;
      };

      case (gatewayPing <= 250): {
        gatewayString = `Gateway <:yellow_ball:1070096905075445771> ${gatewayPing}ms`;
        gColor = [227, 158, 24]
        break;
      };

      default: {
        gatewayString = `Gateway <:red_ball:1070096901942284368> ${gatewayPing}ms`;
        gColor = [227, 24, 24]
        break;
      };
    }

    // API Ping
    switch (true) {
      case (apiPing <= 200): {
        apiString = `API <:green_ball:1070096909483647066> ${apiPing}ms`;
        aColor = [64, 227, 24]
        break;
      };

      case (apiPing <= 500): {
        apiString = `API <:yellow_ball:1070096905075445771> ${apiPing}ms`;
        aColor = [227, 158, 24]
        break;
      };

      default: {
        apiString = `API <:red_ball:1070096901942284368> **${apiPing}ms**`;
        aColor = [227, 24, 24]
        break;
      };
    }

    const finalColor = colorMixer(gColor, aColor, 50)

    // Embed of the message
    const pingEmbed = new EmbedBuilder()
      .setColor(finalColor)
      .setDescription(`${gatewayString}\n${apiString}`)

    // Return the embed
    await interaction.editReply({ embeds: [pingEmbed] });
    return;
  }
}
