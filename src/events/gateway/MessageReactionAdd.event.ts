import { wait } from "$lib/Common";
import { pino } from "$lib/Logger";
import { Client, Discord, On, ArgsOf } from "discordx";

@Discord()
export abstract class MessageReactionAddEvent {
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
