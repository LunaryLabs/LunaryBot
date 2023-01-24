import type { ClientEvents } from 'discord.js'

export type ArgsOf<K extends keyof ClientEvents> = ClientEvents[K];