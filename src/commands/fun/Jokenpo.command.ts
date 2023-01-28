import { ApplicationCommandOptionType, ChatInputCommandInteraction } from 'discord.js';
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';

@Discord()
export abstract class Jokenpo {
  @Slash({
    name: 'jokenpo',
    description: 'Pedra, papel, tesoura!',
    dmPermission: true
  })
  async Handler(
    @SlashChoice({ name: 'Pedra', value: 'rock' })
    @SlashChoice({ name: 'Papel', value: 'paper' })
    @SlashChoice({ name: 'Tesoura', value: 'scissors' })
    @SlashOption({
      name: 'choice',
      description: 'What\'s is your choice?',
      required: true,
      type: ApplicationCommandOptionType.String
    })
    userChoice: string,

    interaction: ChatInputCommandInteraction,
  ) {
    await interaction.deferReply();

    const botChoices = ['rock', 'paper', 'scissors'];
    const botChoice = botChoices[Math.floor(Math.random() * botChoices.length)];

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
