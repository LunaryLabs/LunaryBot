import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Discord, Slash } from 'discordx';

@Discord()
export abstract class Invite {
  @Slash({
    name: 'invite',
    description: 'Get bot\'s invite!',
    dmPermission: true
  })
  async Handler(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply(); //e

    const infoEmbed = new EmbedBuilder()
      .setTitle('LunaryLabs')
      .setDescription('This bot was made by a completely random team of people who don\'t even know each other but worked together to create a cool bot. We hope with all the love and affection that you like it! <3')
      .setColor('#7ABBFF');

    const inviteButton = new ButtonBuilder()
      .setLabel('Invite')
      .setStyle(ButtonStyle.Link)
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=1067487736447127593&permissions=8&scope=bot%20applications.commands`);

    const githubButton = new ButtonBuilder()
      .setLabel('Github')
      .setStyle(ButtonStyle.Link)
      .setURL('https://github.com/LunaryLabs/lunary-bot');

    const supportButton = new ButtonBuilder()
      .setLabel('Support')
      .setStyle(ButtonStyle.Link)
      .setURL('https://discord.gg/HcWgHF3Mqv');

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      inviteButton,
      githubButton,
      supportButton,
    );

    await interaction.editReply({
      embeds: [infoEmbed],
      components: [buttonRow]
    })
  }
}
