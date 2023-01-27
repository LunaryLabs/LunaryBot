import { ArgsOf, Client, Discord, On } from 'discordx';

import { pino } from '$lib/Logger';

@Discord()
export abstract class InteractionCreate {
  @On({ event: 'interactionCreate' })
  async Handle([i]: ArgsOf<'interactionCreate'>, client: Client) {
    try {
      // Execute interaction
      client.executeInteraction(i)
    } catch (err) {
      // And Reply to the User!
      if (i.isRepliable()) switch (i.deferred || i.replied) {
        case true: { i.editReply('Falha ao executar essa interação...') };
        case false: { i.reply('Falha ao executar essa interação...') };
      };

      // Log Error
      pino.error(err);
    }
  }
}
