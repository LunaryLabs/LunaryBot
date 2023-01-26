import { getAnime } from '$plugins/Anime.plugin'

import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, ButtonInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { Discord, Slash, SlashOption, ButtonComponent } from "discordx";


let res: void | { title: any; synopsis: any; rating: any; image: any; eps: any; nsfw: any; };
let id:string
@Discord()
export abstract class AnimeCommand {
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
    id = interaction.user.id
    await interaction.deferReply();
    let response = await getAnime(anime).catch(err => { console.log(err)})
    res = response
    if(!response) return interaction.editReply({ content: "Não encontrei nenhum anime com esse titulo!"})

    let embed = new EmbedBuilder()
        .setTitle(response?.title + ` [${response?.rating}]`)
        .setDescription(response?.synopsis)
        .setColor('#635bff')
        .setImage(response?.image)

    let button = new ButtonBuilder()
        .setCustomId('anime-view')
        .setStyle(ButtonStyle.Primary)
        .setLabel('Accept')
        .setEmoji('✅')

    let row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(button)
    

    let embed_nsfw = new EmbedBuilder()
        .setTitle(`Nsfw Content`)
        .setDescription('Animes searched here may possibly have nsfw content, do you claim to be over 18?')
        .setColor('#fc1605')

    
    interaction.editReply({ embeds: [embed_nsfw], components: [row]})
  }

  @ButtonComponent({ id: "anime-view" })
  handler(interaction: ButtonInteraction): void {
    
    let embed = new EmbedBuilder()
        .setTitle(res?.title + ` [${res?.rating}]`)
        .setDescription(res?.synopsis)
        .setColor('#635bff')
        .setImage(res?.image)
    if(interaction.user.id !== id) interaction.reply({ content: "You are't allowed use this button", ephemeral: true})
    else interaction.update({ embeds: [embed], components: []})
  }

}
