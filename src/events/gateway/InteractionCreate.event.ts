import { ArgsOf, Client, Discord, On } from 'discordx';

import { pino } from '$lib/Logger';

@Discord()
export abstract class InteractionCreate {
  @On({ event: 'interactionCreate' })
  async Handle([interaction]: ArgsOf<'interactionCreate'>, client: Client): Promise<void> {
    try {
      // Execute interaction
      await client.executeInteraction(interaction);
    } catch (err) {
      const failInteraction = 'Falha ao executar essa interação...';

      // And Reply to the User!
      if (interaction.isRepliable()) {
        switch (interaction.deferred || interaction.replied) {
          case true:
            await interaction.editReply(failInteraction)
            break;
          case false:
            await interaction.reply(failInteraction);
            break;
        }
      };

      // Log Error
      pino.error(err);
    }
  }
}
