import { RGBTuple } from 'discord.js';

export const colorChannelMixer = (
  colorChannelA: number,
  colorChannelB: number,
  amountToMix: number
) => {
  const channelA = colorChannelA*amountToMix;
  const channelB = colorChannelB*(1-amountToMix);
  return Number(channelA+channelB);
}

export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export const colorMixer = (
  rgbA: RGBTuple,
  rgbB: RGBTuple,
  amount: Range<0, 100>
): RGBTuple => {
  const amountToMix = amount / 100;

  const r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
  const g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
  const b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);

  return [r, g, b];
}
