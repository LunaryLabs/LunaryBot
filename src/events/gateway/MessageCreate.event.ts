import { ArgsOf, Client, Discord, On } from "discordx";

import { pino } from "$lib/Logger";

@Discord()
export abstract class MessageCreate {
  @On({ event: 'messageCreate' })
  async Handle([msg]: ArgsOf<'messageCreate'>, client: Client) {
    try {
      client.executeCommand(msg)
    } catch(err) {
      // Reply's to the user
      msg.reply('Falha ao executar essa interação...');

      // Log's the Error
      pino.error(err);
    }
  }
}
