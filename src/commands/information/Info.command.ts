import { ApplicationCommandType, EmbedBuilder, UserContextMenuCommandInteraction } from 'discord.js';
import { ContextMenu, Discord } from 'discordx';

@Discord()
export abstract class Info {
  @ContextMenu({
    name: 'View Info',
    dmPermission: true,
    type: ApplicationCommandType.User,
  })
  async Handler(interaction: UserContextMenuCommandInteraction) {
    await interaction.deferReply({ ephemeral: true })

    let infoEmbed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.targetMember?.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.targetUser.id}/${interaction.targetUser?.avatar}.jpg?size=4096` })
      .setColor('#635bff')
      .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.targetUser.id}/${interaction.targetUser?.avatar}.jpg?size=4096`)
      .addFields({
        name: 'User ID',
        value: interaction.targetUser.id
      })
      .addFields({
        name: 'User Bot',
        value: `${interaction.targetUser.bot ? '`Yes`' : '`No`'}`
      })

    await interaction.editReply({ embeds: [infoEmbed] })
  }
};
