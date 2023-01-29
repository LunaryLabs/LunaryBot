import { pino } from '$structures/Logger.js';
import { sentry } from '$structures/Sentry.js';
import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, GuildMemberRoleManager, PermissionsBitField } from 'discord.js';
import { Client, Discord, Slash, SlashChoice, SlashOption } from 'discordx';

@Discord()
export abstract class Ban {
  @Slash({
    name: 'banir',
    description: 'Moderação Bane usuários',
    defaultMemberPermissions: ['BanMembers'],
    dmPermission: false
  })
  async Handler(
    @SlashOption({
      name: 'usuário',
      description: 'R ‣ O usuário a banir',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    user: GuildMember,

    @SlashOption({
      name: 'motivo',
      description: 'R ‣ O motivo para banir',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    reason: string,

    @SlashChoice({ name: 'Deletar mensagens de até 7d atrás', value: 604800 })
    @SlashChoice({ name: 'Deletar mensagens de até 6d atrás', value: 518400 })
    @SlashChoice({ name: 'Deletar mensagens de até 5d atrás', value: 432000 })
    @SlashChoice({ name: 'Deletar mensagens de até 4d atrás', value: 345600 })
    @SlashChoice({ name: 'Deletar mensagens de até 3d atrás', value: 259200 })
    @SlashChoice({ name: 'Deletar mensagens de até 2d atrás', value: 172800 })
    @SlashChoice({ name: 'Deletar mensagens de até 1d atrás', value: 86400 })
    @SlashChoice({ name: 'Deletar nenhuma mensagem', value: 0 })
    @SlashOption({
      name: 'deletar-mensagens',
      description: 'O ‣ Excluir mensagens, a quantos dias?',
      type: ApplicationCommandOptionType.Number,
      required: false,

      minValue: 0,
      maxValue: 7
    })
    days: number,

    interaction: ChatInputCommandInteraction,
    client: Client
  ) {
    // Defer the reply to prevent timeout error's
    await interaction.deferReply({ fetchReply: true });

    // Verify thing's
    if (!interaction.member) throw new ReferenceError('Member don\'t exist!');
    if (!interaction.guild) throw new ReferenceError('I don\'t in a guild!');
    if (!interaction.guild.members.me) throw new ReferenceError('I don\'t a member in a guild!');
    if (!client.user) throw new ReferenceError('Client don\'t exist!');

    const roles = interaction.member.roles as GuildMemberRoleManager;
    const targetRoles = user.roles as GuildMemberRoleManager;

    // If the user tries to ban an user above
    if (targetRoles.highest.position > roles.highest.position) {
      // Unauthorized Embed
      const unauthorizedEmbed = new EmbedBuilder()
        .setTitle('Não permitido!')
        .setDescription('Você não é permitido de banir pessoas acima de você!')
        .setColor('Red');

      // Reply's to the user
      await interaction.editReply({ embeds: [unauthorizedEmbed] });
      return;
    }

    // If the user tries to ban the bot
    if (user.id === client.user.id) {
      // Unauthorized Embed
      const unauthorizedEmbed = new EmbedBuilder()
        .setTitle('Não permitido!')
        .setDescription('Você não é permitido de banir o bot!')
        .setColor('Red');

      // Reply's to the user
      await interaction.editReply({ embeds: [unauthorizedEmbed] });
      return;
    }

    // If the user tries to ban himself
    if (user.id === interaction.user.id) {
      // Unauthorized Embed
      const unauthorizedEmbed = new EmbedBuilder()
        .setTitle('Não permitido!')
        .setDescription('Você não é permitido de banir-se!')
        .setColor('Red');

      // Reply's to the user
      await interaction.editReply({ embeds: [unauthorizedEmbed] });
      return;
    }

    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      // Unauthorized Embed
      const unauthorizedEmbed = new EmbedBuilder()
        .setTitle('Não permitido!')
        .setDescription('Eu não tenho a permissão de banir membros (BanMembers)!')
        .setColor('Red');

      // Reply's to the user
      await interaction.editReply({ embeds: [unauthorizedEmbed] });
      return;
    }

    try {
      // Kick's the User from the Guild
      await user.ban({ reason: reason, deleteMessageSeconds: days });

      // And tell's the user
      const successEmbed = new EmbedBuilder()
        .setTitle('Sucesso!')
        .setDescription('Usuário banido com sucesso!')
        .setColor('Green');

      // Reply's to the user
      await interaction.editReply({ embeds: [successEmbed] });
      return;
    } catch (err: unknown) {
      // Log's the error on console
      pino.error('✕ Error when banning an user', err);
      sentry.captureException(err);

      // And tell's the user
      const failEmbed = new EmbedBuilder()
        .setTitle('Sem sucesso!')
        .setDescription('Não foi possível banir esse usuário!')
        .setColor('Red');

      // Reply's to the user
      await interaction.editReply({ embeds: [failEmbed] });
      return;
    }
  }

};
