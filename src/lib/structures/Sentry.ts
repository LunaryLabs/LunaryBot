import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

export const sentry = Sentry;
export const tracing = Tracing;

sentry.init({
  dsn: process.env['SENTRY_DSN'],

  // Sentry integrations
  integrations: [
    new Sentry.Integrations.Console(),
    new Sentry.Integrations.LinkedErrors(),
    new Sentry.Integrations.LocalVariables(),
    new Sentry.Integrations.OnUncaughtException(),
    new Sentry.Integrations.OnUnhandledRejection(),

    new Tracing.Integrations.Prisma(),
  ],

  // Set Environment
  environment: process.env['NODE_ENV'],

  // Other Options
  tracesSampleRate: 1.0,
  serverName: 'LunaryBot',
});
