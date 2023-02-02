import { LunaryActivityType, LunaryIntentsBits, LunaryPartials } from '$types/Lunary.js';

import { pino } from '$structures/Logger.js';
import { GatewayIntentBits, Options } from 'discord.js';
import { Client } from 'discordx';

export class Lunary {
  protected token: string;
  protected intents!: Array<GatewayIntentBits>;
  public client: Client;

  constructor() {
    // Verify if the user is using production or development
    if (process.env['NODE_ENV'] === 'production') {
      // Log in the console
      pino.warn('\u25B2 Loading in production mode..');

      // Set Token
      this.token = process.env['TOKEN_MAIN']!;

      // Set Intents
      this.intents = LunaryIntentsBits.main;
    } else if (process.env['NODE_ENV'] === 'semi-production') {
        // Log in the console
        pino.warn('\u25B2 Loading in production mode..');
        pino.warn('\u25BC Loading in semi-production, use `dist:start` for performance, and sharding..');

        // Set Token
        this.token = process.env['TOKEN_MAIN']!;

        // Set Intents
        this.intents = LunaryIntentsBits.main;
    } else {
      // Log in the console
      pino.warn('\u25B2 Loading in development mode..');

      // Set Token
      this.token = process.env['TOKEN_CANARY']!;

      // Set Intents
      this.intents = LunaryIntentsBits.canary;
    }

    this.client = new Client({
      // Discord intents
      intents: this.intents,

      // Discord partials
      partials: LunaryPartials,

      // Bot Presence
      presence: {
        activities: [{
          name: 'Lunary Labs',
          type: LunaryActivityType.Watching
        }],
        status: 'dnd'
      },

      makeCache: Options.cacheWithLimits({
        ApplicationCommandManager: 0,
        AutoModerationRuleManager: 0,
        BaseGuildEmojiManager: 0,
        GuildBanManager: 0,
        GuildEmojiManager: 0,
        GuildForumThreadManager: 0,
        GuildInviteManager: 0,
        GuildMemberManager: 0,
        GuildScheduledEventManager: 0,
        GuildStickerManager: 0,
        GuildTextThreadManager: 0,
        MessageManager: 0,
        PresenceManager: 0,
        ReactionManager: 0,
        ReactionUserManager: 0,
        StageInstanceManager: 0,
        ThreadManager: 0,
        ThreadMemberManager: 0,
        UserManager: 0,
        VoiceStateManager: 0
      }),

      // Other
      closeTimeout: 10,
      failIfNotExists: true,
      silent: true,
    });

    this.client.login(this.token);
  }
}
