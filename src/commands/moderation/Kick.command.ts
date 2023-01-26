import { ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember, GuildMemberRoleManager, PermissionsBitField } from 'discord.js';
import { Client, Discord, Slash, SlashChoice, SlashOption } from 'discordx';

@Discord()
export abstract class Ban {
  @Slash({
    name: 'kick',
    description: 'kick command with coisas aleatórias',
    defaultMemberPermissions: ['KickMembers'],
    dmPermission: false
  })
  async Handler(
    @SlashOption({
      name: 'user',
      description: 'user with kick',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    user: GuildMember,

    @SlashOption({
      name: 'reason',
      description: 'reason kick',
      type: ApplicationCommandOptionType.String,
      required: false
    })
    reason: string,

    interaction: ChatInputCommandInteraction,
    client: Client
  ) {
    await interaction.deferReply();

    const roles = interaction.member?.roles as GuildMemberRoleManager;
    // const permissions = interaction.member?.permissions as PermissionsBitField;

    // If the user tries to ban an user above
    if (user.roles?.highest?.rawPosition > roles?.highest?.rawPosition) {
      await interaction.editReply({ content: "vai tomar no teu cu" });
      return;
    }

    // If the user tries to ban the bot
    if (user.id === client.user?.id) {
      await interaction.editReply({ content: "ta tentando me expulsar porra" });
      return;
    }

    // If the user tries to ban himself
    if (user.id === interaction.user.id) {
      await interaction.editReply({ content: "Você não pode se expulsar karalho" });
      return;
    }

    // If the bot don't have the 'BanMembers' permission
    if (!interaction.guild?.members.me?.permissions.has('KickMembers')) {
      await interaction.editReply({ content: "Eu não tenho permissão para expulsar ninguem!" });
      return;
    }

    // If the user bot don't have the 'BanMembers' permission
    // if (!permissions.has('BanMembers')) {
    //   await interaction.editReply({ content: "Você não tem permissao fdp, vai tomar no teu cu e arruma essa porra de permissões." });
    //   return;
    // }


    try {
      // Ban the user
      await user.kick(reason)

      // And tell's the user
      await interaction.editReply({ content: "usuário expulso com sucesso!" });
    } catch (err) {
      await interaction.editReply({ content: "Não foi possivel expulsar este usuário" });
    }
  }

};
