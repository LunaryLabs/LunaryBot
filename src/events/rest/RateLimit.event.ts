import { Discord, On, RestArgsOf } from 'discordx';

import { pino } from '$structures/Logger.js';

@Discord()
export abstract class RateLimit {
  @On.rest({ event: 'rateLimited' })
  async Handler([data]: RestArgsOf<'rateLimited'>) {
    pino.error('✕', data);
  }
}
