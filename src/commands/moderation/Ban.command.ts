import { ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember, GuildMemberRoleManager, PermissionsBitField } from 'discord.js';
import { Client, Discord, Slash, SlashChoice, SlashOption } from 'discordx';

@Discord()
export abstract class Ban {
  @Slash({
    name: 'ban',
    description: 'ban command with coisas aleatórias',
    defaultMemberPermissions: ['BanMembers'],
    dmPermission: false
  })
  async Handler(
    @SlashOption({
      name: 'user',
      description: 'user with ban',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    user: GuildMember,

    @SlashOption({
      name: 'reason',
      description: 'reason ban',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    reason: string,

    @SlashChoice({ name: "7-days", value: "7-days" })
    @SlashChoice({ name: "14-days", value: "14-days" })
    @SlashOption({
      name: 'delete-messages',
      description: 'delete messages time',
      type: ApplicationCommandOptionType.String,
      required: false
    })
    days: string,

    interaction: ChatInputCommandInteraction,
    client: Client
  ) {
    await interaction.deferReply();

    const roles = interaction.member?.roles as GuildMemberRoleManager;
    // const permissions = interaction.member?.permissions as PermissionsBitField;

    const dias: Record<string, number> = {
      "7-days": 7,
      "14-days": 14
    }

    // If the user tries to ban an user above
    if (user.roles.highest.rawPosition > roles.highest.rawPosition) {
      await interaction.editReply({ content: "vai tomar no teu cu" });
      return;
    }

    // If the user tries to ban the bot
    if (user.id === client.user?.id) {
      await interaction.editReply({ content: "ta tentando me banir porra" });
      return;
    }

    // If the user tries to ban himself
    if (user.id === interaction.user.id) {
      await interaction.editReply({ content: "Você não pode se banir karalho" });
      return;
    }

    // If the bot don't have the 'BanMembers' permission
    if (!interaction.guild?.members.me?.permissions.has('BanMembers')) {
      await interaction.editReply({ content: "Eu não tenho permissão para banir ninguem!" });
      return;
    }

    // If the user bot don't have the 'BanMembers' permission
    // if (!permissions.has('BanMembers')) {
    //   await interaction.editReply({ content: "Você não tem permissao fdp, vai tomar no teu cu e arruma essa porra de permissões." });
    //   return;
    // }


    try {
      // Ban the user
      await user.ban({ reason: reason, deleteMessageSeconds: dias[days] });

      // And tell's the user
      await interaction.editReply({ content: "usuário banido com sucesso!" });
    } catch (err) {
      await interaction.editReply({ content: "Não foi possivel banir este usuário" });
    }
  }

};
