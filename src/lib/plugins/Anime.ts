import type { IResponse } from '$lib/commands/anime/IResponse.js';

export const getAnime = async (animeName: string) => {
  // Faz a requisição à API externa
  const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${animeName}`);
  const anime: IResponse = await response.json();
  const { attributes } = anime.data[0];

  const formattedAnime = {
    title: attributes.titles.en ? attributes.titles.en_jp : animeName,
    synopsis: attributes?.synopsis,
    rating: attributes?.averageRating,
    image: attributes?.coverImage?.large,
    eps: attributes?.episodeCount,
    nsfw: attributes?.nsfw
  }

  return formattedAnime;
}

export interface AnimeType {
  title: string;
  synopsis: string;
  rating: string;
  image: string;
  eps: number;
  nsfw: boolean;
}
