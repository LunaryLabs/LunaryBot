export async function getAnime(animeName: string) {

        // Faz a requisição à API externa
        const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${animeName}`)
        const anime = await response.json()


        const { attributes } = anime.data[0];

        const formattedAnime = {
          title: attributes?.titles?.en ? attributes?.titles?.en_jp : animeName,
          synopsis: attributes?.synopsis,
          rating: attributes?.averageRating,
          image: attributes?.coverImage?.large,
          eps: attributes?.episodeCount,
          nsfw: attributes?.nsfw
        }



        return formattedAnime
}
