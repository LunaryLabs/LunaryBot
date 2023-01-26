import { Discord, Slash, SlashOption } from "discordx";

import { UserRepository } from "$db/entities/User";
import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";

@Discord()
export abstract class UserData {
  @Slash({
    name: 'userdata',
    description: 'Change User Data',
    dmPermission: false
  })
  async Handler(
    @SlashOption({
      name: 'data',
      description: 'Data to change',
      required: true,
      type: ApplicationCommandOptionType.String
    })
    data: string,

    interaction: ChatInputCommandInteraction
  ) {
    await interaction.deferReply();
    const user = interaction.user;

    const userData = await UserRepository.findOneBy({
      id: user.id
    });

    if (!userData) {
      UserRepository.create({
        name: user.username,
        id: user.id
      });

      interaction.editReply("Criado no DB");
      return;
    }
  }
}
