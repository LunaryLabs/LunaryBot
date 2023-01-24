import { SlashCommandBuilder, CommandInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } from 'discord.js'
import { ICommand } from '$types/Command'

class Command implements ICommand {
  data: SlashCommandBuilder
  
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('invite')
      .setDescription('Get the bot\'s invite link');
  }
  
  async runner(interaction: CommandInteraction): Promise<any> {
    await interaction.deferReply();
  
    const infoEmbed = new EmbedBuilder()
      .setTitle('LunaryLabs')
      .setDescription('This bot was made by a completely random team of people who don\'t even know each other but worked together to create a cool bot. We hope with all the love and affection that you like it! <3')
      .setColor('#7ABBFF');

    const inviteButton = new ButtonBuilder()
      .setLabel("Invite")
      .setStyle(ButtonStyle.Link)
      .setURL(`https://discord.gg/HcWgHF3Mqv`);
    
    const githubButton = new ButtonBuilder()
      .setLabel("Github")
      .setStyle(ButtonStyle.Link)
      .setURL("https://github.com/LunaryLabs/lunary-bot");

    const supportButton = new ButtonBuilder()
      .setLabel("Support")
      .setStyle(ButtonStyle.Link)
      .setURL("https://discord.gg/HcWgHF3Mqv");

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