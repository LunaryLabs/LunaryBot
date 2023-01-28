export interface IResponse {
  data: Array<IKitsuAnimeResponse>;
}

export interface IKitsuAnimeResponse {
  attributes: {
    /**
     * @name createdAt
     * @description ISO 8601 date and time
     * @typedef string
     *
     * @example 2013-02-20T16:00:13.609Z
     */
    createdAt: string;

    /**
     * @name updatedAt
     * @description ISO 8601 of last modification
     * @typedef string
     *
     * @example 2017-12-20T00:00:09.270Z
     */
    updatedAt: string;

    /**
     * @name slug
     * @typedef string
     *
     * @example cowboy-bebop
     */
    slug: string;

    /**
     * @name synopsis
     * @typedef string
     *
     * @example In the year 2071, humanity has colonoized several of the planets and moons...
     */
    synopsis: string;

    /**
     * @name coverImageTopOffset
     * @typedef number
     *
     * @example 400
     * @deprecated
     */
    coverImageTopOffset: number;

    /**
     * @name titles
     * @description Titles in different languages. Other languages will be listed if they exist.
     * @typedef object
     */
    titles: {
      /**
       * @name en
       * @typedef string
       * @example Cowboy Bebop
       */
      en: string;

      /**
       * @name en_jp
       * @typedef string
       * @example Cowboy Bebop
       */
      en_jp: string;

      /**
       * @name ja_jp
       * @typedef string
       * @example カウボーイビバップ
       */
      ja_jp: string;
    };

    /**
     * @name canonicalTitle
     * @typedef string
     * @example Cowboy Bebop
     */
    canonicalTitle: string;

    /**
     * @name abbreviatedTitles
     * @typedef Array<string>
     */
    abbreviatedTitles: Array<string>;

    /**
     * @name averageRating
     * @typedef string
     *
     * @example 88.55
     */
    averageRating: string;

    /**
     * @name ratingFrequencies
     * @typedef Record<number, string>
     */
    ratingFrequencies: Record<number, string>;

    /**
     * @name userCount
     * @typedef number
     *
     * @example 43409
     */
    userCount: number;

    /**
     * @name favoritesCount
     * @typedef number
     *
     * @example 3485
     */
    favoritesCount: number;

    /**
     * @name startDate
     * @description YYYY-MM-DD date
     * @typedef string
     *
     * @example 1998-04-03
     */
    startDate: string;

    /**
     * @name endDate
     * @description YYYY-MM-DD endDate
     * @typedef string
     *
     * @example 1999-04-24
     */
    endDate: string;

    /**
     * @name popularityRank
     * @typedef number
     *
     * @example 10
     */
    popularityRank: number;

    /**
     * @name ratingRank
     * @typedef number
     *
     * @example 10
     */
    ratingRank: number;

    /**
     * @name ageRating
     * @typedef AgeRating
     *
     * @example R: string
     */
    ageRating: AgeRating;

    /**
     * @name ageRatingGuide
     * @typedef string
     *
     * @example 17+ (violence & profanity)
     */
    ageRatingGuide: string;

    /**
     * @name subtype
     * @typedef SubType
     *
     * @example TV: string
     */
    subtype: SubType;

    /**
     * @name status
     * @typedef Status
     *
     * @example finished: string
     */
    status: Status;

    /**
     * @name tba
     * @typedef string
     */
    tba: string;

    /**
     * @name posterImage
     * @typedef object
     */
    posterImage: {
      /**
       * @name tiny
       * @typedef string
       *
       * @example https://media.kitsu.io/anime/poster_images/1/tiny.jpg?1431697256
       */
      tiny: string;

      /**
       * @name tiny
       * @typedef string
       *
       * @example https://media.kitsu.io/anime/poster_images/1/small.jpg?1431697256
       */
      small: string;

      /**
       * @name tiny
       * @typedef string
       *
       * @example https://media.kitsu.io/anime/poster_images/1/medium.jpg?1431697256
       */
      medium: string;

      /**
       * @name tiny
       * @typedef string
       *
       * @example https://media.kitsu.io/anime/poster_images/1/large.jpg?1431697256
       */
      large: string;

      /**
       * @name tiny
       * @typedef string
       *
       * @example https://media.kitsu.io/anime/poster_images/1/original.jpg?1431697256
       */
      original: string;

      /**
       * @name meta
       * @typedef object
       */
      meta: {
        /**
         * @name dimensions
         * @typedef object
         */
        dimensions: {
          /**
           * @name tiny
           * @typedef object
           */
          tiny: {
            /**
             * @name width
             * @typedef string
             */
            width: string;

            /**
             * @name height
             * @typedef string
             */
            height: string;
          }

          /**
           * @name small
           * @typedef object
           */
          small: {
            /**
             * @name width
             * @typedef string
             */
            width: string;

            /**
             * @name height
             * @typedef string
             */
            height: string;
          }

          /**
           * @name medium
           * @typedef object
           */
          medium: {
            /**
             * @name width
             * @typedef string
             */
            width: string;

            /**
             * @name height
             * @typedef string
             */
            height: string;
          }

          /**
           * @name large
           * @typedef object
           */
          large: {
            /**
             * @name width
             * @typedef string
             */
            width: string;

            /**
             * @name height
             * @typedef string
             */
            height: string;
          }
        }
      }
    };

    /**
     * @name coverImage
     * @typedef object
     */
    coverImage: {
      /**
       * @name tiny
       * @typedef string
       *
       * @example https://media.kitsu.io/anime/poster_images/1/tiny.jpg?1431697256
       */
      tiny: string;

      /**
       * @name tiny
       * @typedef string
       *
       * @example https://media.kitsu.io/anime/poster_images/1/small.jpg?1431697256
       */
      small: string;

      /**
       * @name tiny
       * @typedef string
       *
       * @example https://media.kitsu.io/anime/poster_images/1/medium.jpg?1431697256
       */
      medium: string;

      /**
       * @name tiny
       * @typedef string
       *
       * @example https://media.kitsu.io/anime/poster_images/1/large.jpg?1431697256
       */
      large: string;

      /**
       * @name tiny
       * @typedef string
       *
       * @example https://media.kitsu.io/anime/poster_images/1/original.jpg?1431697256
       */
      original: string;

      /**
       * @name meta
       * @typedef object
       */
      meta: {
        /**
         * @name dimensions
         * @typedef object
         */
        dimensions: {
          /**
           * @name tiny
           * @typedef object
           */
          tiny: {
            /**
             * @name width
             * @typedef string
             */
            width: string;

            /**
             * @name height
             * @typedef string
             */
            height: string;
          }

          /**
           * @name small
           * @typedef object
           */
          small: {
            /**
             * @name width
             * @typedef string
             */
            width: string;

            /**
             * @name height
             * @typedef string
             */
            height: string;
          }

          /**
           * @name medium
           * @typedef object
           */
          medium: {
            /**
             * @name width
             * @typedef string
             */
            width: string;

            /**
             * @name height
             * @typedef string
             */
            height: string;
          }

          /**
           * @name large
           * @typedef object
           */
          large: {
            /**
             * @name width
             * @typedef string
             */
            width: string;

            /**
             * @name height
             * @typedef string
             */
            height: string;
          }
        }
      }
    };

    /**
     * @name episodeCount
     * @typedef number
     *
     * @example 26
     */
    episodeCount: number;

    /**
     * @name episodeLength
     * @description Length of episode in minutes
     * @typedef number
     *
     * @example 25
     */
    episodeLength: number;

    /**
     * @name youtubeVideoId
     * @description ID of a youtube trailer
     * @typedef string
     *
     * @example qig4KOK2R2g
     */
    youtubeVideoId: string;

    /**
     * @name showType
     * @typedef ShowType
     *
     * @example TV: string
     * @deprecated
     */
    showType: ShowType;

    /**
     * @name showType
     * @description NSFW media requires authentication
     * @typedef boolean
     *
     * @example false
     */
    nsfw: boolean;
  }
}

const enum AgeRating {
  'G',
  'PG',
  'R',
  'R18'
}

const enum SubType {
  'ONA',
  'OVA',
  'TV',
  'movie',
  'music',
  'special'
}

const enum ShowType {
  'ONA',
  'OVA',
  'TV',
  'movie',
  'music',
  'special'
}

const enum Status {
  'current',
  'finished',
  'tba',
  'unreleased',
  'upcoming'
}
