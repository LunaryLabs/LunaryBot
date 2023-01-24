import { SlashCommandBuilder, ClientEvents, CommandInteraction } from 'discord.js'

export interface IEvent {
  event: keyof ClientEvents;
  runner: (...args: any) => Promise<void>;
}