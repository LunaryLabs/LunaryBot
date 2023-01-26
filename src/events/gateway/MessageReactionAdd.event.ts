import { ArgsOf, Client, Discord, On } from "discordx";

import { pino } from "$lib/Logger";
import { wait } from "$lib/Common";

@Discord()
export abstract class MessageReactionAdd {
  @On({ event: 'messageReactionAdd' })
  async Handle([reaction, user]: ArgsOf<'messageReactionAdd'>, client: Client) {
    try {
      // Execute interaction
      await client.executeReaction(reaction, user);
    } catch (err) {
      const failReaction = 'Falha ao executar essa reação...';

      // And Reply to the User!
      const msg = await reaction.message.reply(failReaction);

      // Log Error
      pino.error(err);

      await wait(5000);
      if (msg.deletable) msg.delete();
    }
  }
}
