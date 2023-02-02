import Pino from 'pino';
import PinoPretty from 'pino-pretty';

const pretty = PinoPretty({
  // Pretty Options
  colorize: true,
  translateTime: true,
  append: true
});

export const pino = Pino({
  safe: true,
  enabled: true
}, pretty);
