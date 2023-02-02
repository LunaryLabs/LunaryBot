import { Discord, On, RestArgsOf } from 'discordx';

import { pino } from '$structures/Logger.js';
import { sentry } from '$structures/Sentry.js';

@Discord()
export abstract class RateLimit {
  @On.rest({ event: 'rateLimited' })
  async Handler([data]: RestArgsOf<'rateLimited'>) {
    pino.error('\u2717 Rate Limited: ', data);
    sentry.captureException(data);
  }
}
