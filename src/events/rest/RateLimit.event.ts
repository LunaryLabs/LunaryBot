import { Discord, On, RestArgsOf } from "discordx";

import { pino } from "$lib/Logger";

@Discord()
export abstract class RateLimit {
  @On.rest({ event: 'rateLimited' })
  async Handler([data]: RestArgsOf<'rateLimited'>) {
    pino.error(data);
  }
}
