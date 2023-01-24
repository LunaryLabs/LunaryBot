import { ChatInputApplicationCommandData, Client, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { lunary } from '$/src'
import { pino } from '$lib/Logger';

export interface ICommand {
  data: SlashCommandBuilder;
  runner: (interaction: CommandInteraction) => Promise<void>;
}

export class Command {
  constructor(data: ChatInputApplicationCommandData) {
    lunary.client.application?.commands.create(data);
    lunary.commands.push(data)
    pino.info(`[/] comando ${data.name} carregado com sucesso`)
  }
}