import { Discord, Slash, SlashGroup, SlashOption } from "discordx";

import { pClient } from "@db";
import { ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember } from "discord.js";

@Discord()
@SlashGroup("economy")
export abstract class Pay {
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
    user: GuildMember,

    @SlashOption({
      name: 'quantity',
      description: 'Quantity to pay',
      required: true,
      type: ApplicationCommandOptionType.Integer,

      minValue: 1
    })
    quantity: number,

    interaction: ChatInputCommandInteraction
  ) {
    await interaction.deferReply();

    const receiverId = user.id;

    let receiver = await pClient.user.findUnique({
      where: { id: receiverId }
    })

    if (!receiver) {
      receiver = await pClient.user.create({
        data: { id: receiverId }
      }) as NonNullable<typeof receiver>
    }

    const resultMoney = receiver.money += quantity

    await pClient.user.update({
      where: { id: receiverId },
      data: { money: resultMoney }
    });

    await interaction.editReply({
      content: JSON.stringify({
        uuid: receiver.uuid,
        id: receiver.id,
        money: receiver.money,
        createdAt: receiver.createdAt
      })
    });
  }
}
