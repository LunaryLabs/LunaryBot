import { ArgsOf, Client, Discord, On } from "discordx";

import { pino } from "$lib/Logger.js";

@Discord()
export abstract class MessageReactionAdd {
  @On({ event: 'messageReactionAdd' })
  async Handle([reaction, user]: ArgsOf<'messageReactionAdd'>, client: Client) {
    try {
      // Execute reaction
      client.executeReaction(reaction, user)
    } catch (err) {
      // Reply's to the user, and remove the Reaction
      reaction.message.reply('Falha ao executar essa reação...');
      reaction.remove();

      // Log's the Error
      pino.error(err);
    }
  }
}
