import { ApplicationCommandType, EmbedBuilder, UserContextMenuCommandInteraction } from 'discord.js';
import { Discord, ContextMenu } from 'discordx'

@Discord()
export abstract class InfoCommand {
    @ContextMenu({
        name: "View Avatar",
        type: ApplicationCommandType.User,
      })
    
    async Handler(interaction: UserContextMenuCommandInteraction): Promise<void> {
        await interaction.deferReply({ ephemeral: true})
        let embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.targetMember?.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.targetUser.id}/${interaction.targetUser?.avatar}.jpg?size=4096` })
            .setColor('#635bff')
            .setImage(`https://cdn.discordapp.com/avatars/${interaction.targetUser.id}/${interaction.targetUser?.avatar}.jpg?size=4096`)
            
        interaction.editReply({ embeds: [embed]})
      }
};
