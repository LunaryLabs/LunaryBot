import { pino } from '$lib/Logger';
import { Discord, On, ArgsOf, Client } from 'discordx'

@Discord()
export abstract class InteractionCreateEvent {
  @On({ event: 'interactionCreate' })
  async Handle([interaction]: ArgsOf<'interactionCreate'>, client: Client): Promise<void> {
    try {
      // Execute interaction
      await client.executeInteraction(interaction);
    } catch (err) {
      const failInteraction = 'Falha ao executar essa interação...';

      // And Reply to the User!
      if (interaction.isRepliable()) interaction.reply(failInteraction);

      // Log Error
      pino.error(err);
    }
  }
}
