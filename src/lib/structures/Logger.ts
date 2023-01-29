import Pino from 'pino';
import PinoPretty from 'pino-pretty';

const pretty = PinoPretty({
  // Pretty Options
  colorize: true,

  // Single Line
  singleLine: true,
  append: true
});

export const pino = Pino({
  // Info of the Logger
  name: 'LunaryBot',
  enabled: true,
  timestamp: false,
  safe: true,
}, pretty);
