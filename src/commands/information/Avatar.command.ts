import { ApplicationCommandType, EmbedBuilder, UserContextMenuCommandInteraction } from 'discord.js';
import { ContextMenu, Discord } from 'discordx';

@Discord()
export abstract class Avatar {
  @ContextMenu({
    name: 'View Avatar',
    dmPermission: true,
    type: ApplicationCommandType.User
  })
  async Handler(interaction: UserContextMenuCommandInteraction) {
    await interaction.deferReply({ ephemeral: true })

    // User Avatar Embed
    let avatarEmbed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.targetMember?.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.targetUser.id}/${interaction.targetUser?.avatar}.jpg?size=4096` })
      .setColor('#635bff')
      .setImage(`https://cdn.discordapp.com/avatars/${interaction.targetUser.id}/${interaction.targetUser?.avatar}.jpg?size=4096`)

    await interaction.editReply({ embeds: [avatarEmbed] })
  }
};
