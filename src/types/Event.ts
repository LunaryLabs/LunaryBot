import { ClientEvents } from 'discord.js'

export interface IEvent {
  event: keyof ClientEvents;
  once: boolean;
  runner: (...args: any) => Promise<void>;
}