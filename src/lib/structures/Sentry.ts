import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

export const sentry = Sentry;
export const tracing = Tracing;

process.on('uncaughtException', sentry.captureException);
process.on('unhandledRejection', sentry.captureException);

sentry.init({
  dsn: process.env["SENTRY_DSN"],
  tracesSampleRate: 1.0,
  serverName: 'LunaryBot',
  enabled: true
});
