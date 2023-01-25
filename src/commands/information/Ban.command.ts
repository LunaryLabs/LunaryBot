import { ApplicationCommandOptionType, RoleManager, CommandInteraction, GuildMember, GuildMemberRoleManager, ChatInputCommandInteraction, PermissionsBitField } from 'discord.js';
import { Discord, Slash, SlashOption, SlashChoice } from 'discordx'
import { SexoCommand } from './Sexo.command';

@Discord()
export abstract class BanCommand {
  @Slash({
    name: 'ban',
    description: 'ban command with coisas aleatórias',
    dmPermission: true
  })
  async Handler(
    @SlashOption({
        type: ApplicationCommandOptionType.User,
        name: 'user',
        description: 'user with ban',
        required: true
    })
    user: GuildMember,
    @SlashOption({
      type: ApplicationCommandOptionType.String,
      name: 'reason',
      description: 'reason ban'
    })
    reason:string,

    @SlashChoice({ name: "7-days", value: "7-days" })
    @SlashChoice({ name: "14-days", value: "14-days" })
    @SlashOption({
      type: ApplicationCommandOptionType.String,
      name: 'delete-messages',
      description: 'delete messages time',
      required: false
    })
    days: string,

    interaction: ChatInputCommandInteraction
    ): Promise<any> {
      await interaction.deferReply()
      let role = interaction.member?.roles as GuildMemberRoleManager
      let perms = interaction.member?.permissions as PermissionsBitField
      let dias: Record<string, number> = {
        "7-days": 7,
        "14-days": 14
      }
      if(user.roles.highest.rawPosition > role.highest.rawPosition) return interaction.editReply({ content: "vai tomar no teu cu"})
      if(user.id === interaction.client.user.id) return interaction.editReply({ content: "ta tentando me banir porra"})
      if(user.id === interaction.user.id) return interaction.editReply({ content: "Você não pode se banir karalho"})
      if(!interaction.guild?.members.me?.permissions.has('BanMembers')) return interaction.editReply({ content: "Eu não tenho permissão para banir ninguem!"})
      if(!perms.has('BanMembers')) return interaction.editReply({ content: "Você não tem permissao fdp, vai tomar no teu cu e arruma essa porra de permissões."})
      user.ban({reason: reason, deleteMessageSeconds: dias[days]}).then(() => {
        interaction.editReply({ content: "usuário banido com sucesso!"})
      }).catch((err) => {
        console.log(err)
        interaction.editReply({ content: "Não foi possivel banir este usuário"})
      })
  }
};