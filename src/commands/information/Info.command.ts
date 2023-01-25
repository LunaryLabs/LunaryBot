import { ApplicationCommandType, EmbedBuilder, UserContextMenuCommandInteraction } from 'discord.js';
import { Discord, ContextMenu } from 'discordx'

@Discord()
export abstract class InfoCommand {
    @ContextMenu({
        name: "View Info",
        type: ApplicationCommandType.User,
      })
    
    async Handler(interaction: UserContextMenuCommandInteraction): Promise<void> {
        await interaction.deferReply({ ephemeral: true})
        console.log(`https://cdn.discordapp.com/avatars/${interaction.targetUser.id}/${interaction.targetMember?.avatar}.jpg?size=4096`)
        let embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.targetMember?.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.targetUser.id}/${interaction.targetUser?.avatar}.jpg?size=4096` })
            .setColor('#635bff')
            .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.targetUser.id}/${interaction.targetUser?.avatar}.jpg?size=4096`)
            .setFields(
                {
                    name: "User ID",
                    value: interaction.targetUser.id
                },
                {
                    name: "User Bot",
                    value: `${interaction.targetUser.bot ? "`Yes`" : "`No`"}`
                }
            )
        interaction.editReply({ embeds: [embed]})
      }
};
