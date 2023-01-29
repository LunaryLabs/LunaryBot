import { pino } from '$structures/Logger.js';
import { sentry } from '$structures/Sentry.js';
import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, GuildMemberRoleManager, PermissionsBitField } from 'discord.js';
import { Client, Discord, Slash, SlashOption } from 'discordx';

@Discord()
export abstract class Kick {
  @Slash({
    name: 'expulsar',
    description: 'Moderação Expulse usuários',
    defaultMemberPermissions: ['KickMembers'],
    dmPermission: false
  })
  async Handler(
    @SlashOption({
      name: 'usuário',
      description: 'R ‣ O usuário a expulsar',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    user: GuildMember,

    @SlashOption({
      name: 'motivo',
      description: 'O ‣ O motivo para expulsar',
      type: ApplicationCommandOptionType.String,
      required: false
    })
    reason: string,

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

    // Get role from the User
    const roles = interaction.member.roles as GuildMemberRoleManager;
    const targetRoles = user.roles as GuildMemberRoleManager;

    // If the user tries to ban an user above
    if (targetRoles.highest.position > roles.highest.position) {
      // Unauthorized Embed
      const unauthorizedEmbed = new EmbedBuilder()
        .setTitle('Não permitido!')
        .setDescription('Você não é permitido de expulsar pessoas acima de você!')
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
        .setDescription('Você não é permitido de expulsar o bot!')
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
        .setDescription('Você não é permitido de expulsar-se!')
        .setColor('Red');

      // Reply's to the user
      await interaction.editReply({ embeds: [unauthorizedEmbed] });
      return;
    }

    // If the bot don't have the 'KickMembers' permission
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      // Unauthorized Embed
      const unauthorizedEmbed = new EmbedBuilder()
        .setTitle('Não permitido!')
        .setDescription('Eu não tenho a permissão de expulsar membros (KickMembers)!')
        .setColor('Red');

      // Reply's to the user
      await interaction.editReply({ embeds: [unauthorizedEmbed] });
      return;
    }

    try {
      // Kick's the User from the Guild
      await user.kick(reason);

      // And tell's the user
      const successEmbed = new EmbedBuilder()
        .setTitle('Sucesso!')
        .setDescription('Usuário expulso com sucesso!')
        .setColor('Green');

      // Reply's to the user
      await interaction.editReply({ embeds: [successEmbed] });
      return;
    } catch (err: unknown) {
      // Log's the error on console
      pino.error('✕ Error when kicking an user', err);
      sentry.captureException(err);

      // And tell's the user
      const failEmbed = new EmbedBuilder()
        .setTitle('Sem sucesso!')
        .setDescription('Não foi possível expulsar esse usuário!')
        .setColor('Red');

      // Reply's to the user
      await interaction.editReply({ embeds: [failEmbed] });
      return;
    }
  }
}
