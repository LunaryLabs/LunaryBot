import { Collection } from "discord.js";

export const wait = (ms: number) => new Promise((resolve) => {
  const timeout = setTimeout(() => {
    resolve(ms);
    clearTimeout(timeout)
  }, ms)
});

export const perfData = new Collection<string, number>