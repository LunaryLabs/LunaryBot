import { pClient } from '$database/Prisma.js';
import { ActionRowBuilder, APIInteractionGuildMember, ApplicationCommandOptionType, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, GuildMember, Message } from 'discord.js';
import { ButtonComponent, Discord, Slash, SlashGroup, SlashOption } from 'discordx';

@Discord()
@SlashGroup('economy')
export abstract class Pay {
  quantity: number;

  receiver: GuildMember;
  payer: GuildMember;

  confirmInteraction: Message;
  waitingInteraction: Message;

  @Slash({
    name: 'pay',
    description: 'Pay someones!',
    dmPermission: false
  })
  async Handler(
    @SlashOption({
      name: 'user',
      description: 'User to pay',
      required: true,
      type: ApplicationCommandOptionType.User
    })
    user: GuildMember | APIInteractionGuildMember,

    @SlashOption({
      name: 'quantity',
      description: 'Quantity to pay',
      required: true,
      type: ApplicationCommandOptionType.Integer,

      minValue: 1,
    })
    quantity: number,

    interaction: ChatInputCommandInteraction
  ) {
    // Defer the reply to prevent timeout error's
    await interaction.deferReply({ fetchReply: true });

    this.receiver = user as GuildMember;
    this.quantity = quantity;

    this.payer = interaction.member as GuildMember;

    const waitingEmbed = new EmbedBuilder()
      .setColor(0xFFA811)
      .setDescription(`Aguardando <@${interaction.user.id}> confirmar a transferência..`)

    this.waitingInteraction = await interaction.editReply({
      embeds: [waitingEmbed]
    })

    await this.HandleConfirmation(interaction);
    return;
  }

  async HandleConfirmation(interaction: ChatInputCommandInteraction) {
    const formattedQuantity = Intl.NumberFormat('pt-BR', {
      currency: 'USD',
      style: 'currency',
    }).format(this.quantity)

    const confirmEmbed = new EmbedBuilder()
      .setTitle('Confirmação')
      .setDescription(`Você confirma mandar ${formattedQuantity} para <@${this.receiver.id}>`)
      .setColor('Red');

    const confirmButton = new ButtonBuilder()
      .setEmoji('✅')
      .setLabel('Sim')
      .setStyle(ButtonStyle.Primary)
      .setCustomId('confirmButton');

    const counteractButton = new ButtonBuilder()
      .setEmoji('❎')
      .setLabel('Não')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId('cancelButton');

    const confirmRow = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(confirmButton, counteractButton);

    this.confirmInteraction = await interaction.followUp({
      embeds: [confirmEmbed],
      components: [confirmRow],
      isInteraction: true
    });
    return;
  }

  // Handle's when the user accept the transfer
  @ButtonComponent({ id: 'confirmButton' })
  async HandleConfirm(interaction: ButtonInteraction) {
    // Verify if the Payer exists on Database
    let payerDb = await pClient.user.findUnique({
      where: { id: this.payer.id }
    });

    // If the payer don't exists
    if (!payerDb) {
      // Create it on the database
      payerDb = await pClient.user.create({
        data: { id: this.payer.id }
      })
    }

    // Verify if the Receiver exists on Database
    let receiverDb = await pClient.user.findUnique({
      where: { id: this.receiver.id }
    });

    // If the receiver don't exists
    if (!receiverDb) {
      // Create it on the database
      receiverDb = await pClient.user.create({
        data: { id: this.receiver.id }
      })
    }

    console.log(Date.now())
    // ***************
    console.log(receiverDb)
    console.log(payerDb)
    return;
  }

  // Handle's when the user declines the transfer
  @ButtonComponent({ id: 'cancelButton' })
  async HandleCounteract(interaction: ButtonInteraction) {
    const cancelledEmbed = new EmbedBuilder()
      .setColor('Red')
      .setDescription(`<@${interaction.user.id}> cancelou a transferência..`);

    this.waitingInteraction.edit({
      components: [],
      embeds: [cancelledEmbed]
    });

    const userCancelledEmbed = new EmbedBuilder()
      .setColor('Red')
      .setDescription('Você cancelou a transferência..');

    this.confirmInteraction.edit({
      components: [],
      embeds: [userCancelledEmbed]
    });
    return;
  }
}
