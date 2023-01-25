import { pino } from "$lib/Logger";
import { Discord, On, RestArgsOf } from "discordx";

@Discord()
export abstract class RateLimitEvent {
  @On.rest({ event: 'rateLimited' })
  async Handler([data]: RestArgsOf<'rateLimited'>) {
    pino.error(data);
  }
}
