import { SlashCommandBuilder, CommandInteraction } from 'discord.js'

export interface ICommand {
  data: SlashCommandBuilder;
  runner: (interaction: CommandInteraction) => Promise<void>;
}