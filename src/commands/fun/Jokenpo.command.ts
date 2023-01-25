import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";

@Discord()
export abstract class JokenpoCommand {
  @Slash({
    name: 'joquempo',
    description: 'Pedra, papel, tesoura!',
    dmPermission: true
  })
  async Handler(
    @SlashChoice({ name: 'Pedra', value: 'rock' })
    @SlashChoice({ name: 'Papel', value: 'paper' })
    @SlashChoice({ name: 'Tesoura', value: 'scissors' })
    @SlashOption({
      name: 'escolha',
      description: 'Qual escolha você ira utilizar..',
      required: true,
      type: ApplicationCommandOptionType.String
    })
    userChoice: string,

    interaction: CommandInteraction,
  ) {
    await interaction.deferReply();

    const botChoices = ["rock", "paper", "scissors"];
    const botChoice = botChoices[Math.floor(Math.random() * botChoices.length)];

    interaction.member?.roles

    // 0 = Tie
    // 1 = Player Wins
    // 2 = Computer Wins
    let result = 0;

    if (botChoice == userChoice) result = 0;

    // Rock
    if (botChoice == 'rock' && userChoice == 'scissors') result = 2;
    if (userChoice == 'rock' && botChoice == 'scissors') result = 1;

    // Scissors
    if (botChoice == 'scissors' && userChoice == 'paper') result = 2;
    if (userChoice == 'scissors' && botChoice == 'paper') result = 1;


    if (botChoice == 'paper' && userChoice == 'rock') result = 2;
    if (userChoice == 'paper' && botChoice == 'rock') result = 1;

    switch (result) {
      case 1: return await interaction.editReply('Você ganhou!');
      case 2: return await interaction.editReply('o Robô ganhou!');
      default: return await interaction.editReply('EMPATE');
    }
  }
}
