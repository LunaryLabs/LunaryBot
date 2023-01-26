import { ArgsOf, Client, Discord, On } from "discordx";

import { pino } from "$lib/Logger";

@Discord()
export abstract class MessageCreate {
  @On({ event: 'messageCreate' })
  async Handle([msg]: ArgsOf<'messageCreate'>, client: Client) {
    await client.executeCommand(msg)
    try {
      // Execute interaction
      await client.executeCommand(msg)
  } catch (err) {
      const failInteraction = 'Falha ao executar essa interação...';

      // And Reply to the User!
      await msg.reply(failInteraction);

      // Log Error
      pino.error(err);
    }
  }
}
