import { AnimeType, getAnime } from '$plugins/Anime.plugin'

import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, ButtonInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { Discord, Slash, SlashOption, ButtonComponent } from "discordx";


@Discord()
export abstract class Anime {
  res: AnimeType;
  id: string;

  @Slash({
    name: 'anime',
    description: 'Pesquise animes!',
    dmPermission: true
  })
  async Handler(
    @SlashOption({
      name: 'name',
      description: 'Qual o nome do anime?',
      required: true,
      type: ApplicationCommandOptionType.String
    })
    anime: string,

    interaction: ChatInputCommandInteraction,
  ) {
    await interaction.deferReply();

    // Set Response and ID
    this.res = await getAnime(anime);
    this.id = interaction.user.id


    if (!this.res) {
      await interaction.editReply({ content: "Não encontrei nenhum anime com esse titulo!" });
      return;
    }

    const button = new ButtonBuilder()
      .setCustomId('anime-view')
      .setStyle(ButtonStyle.Primary)
      .setLabel('Accept')
      .setEmoji('✅')

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(button)


    const embed_nsfw = new EmbedBuilder()
      .setTitle(`Nsfw Content`)
      .setDescription('Animes searched here may possibly have nsfw content, do you claim to be over 18?')
      .setColor('#fc1605')


    await interaction.editReply({ embeds: [embed_nsfw], components: [row] })
  }

  @ButtonComponent({ id: "anime-view" })
  async HandleButton(interaction: ButtonInteraction) {

    const embed = new EmbedBuilder()
      .setTitle(this.res.title + ` [${this.res.rating}]`)
      .setDescription(this.res.synopsis)
      .setColor('#635bff')
      .setImage(this.res.image)

    if (interaction.user.id !== this.id) {
      await interaction.reply({ content: "You are't allowed use this button", ephemeral: true })
      return;
    }

    await interaction.update({ embeds: [embed], components: [] })
  }

}
