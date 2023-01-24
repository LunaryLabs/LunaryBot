import { Discord, On, ArgsOf, Client } from 'discordx'

@Discord()
export abstract class InteractionCreateEvent {
  @On({ event: 'interactionCreate' })
  async Handle([interaction]: ArgsOf<'interactionCreate'>, client: Client): Promise<void> {
    await client.executeInteraction(interaction);
  }
}