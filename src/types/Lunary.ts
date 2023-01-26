import { ActivityType, GatewayIntentBits, Partials } from 'discord.js';

export const LunaryIntentsBits: Record<string, GatewayIntentBits[]> = {
  // Intents for Production
  main: [
    // GatewayIntentBits.AutoModerationConfiguration,
    // GatewayIntentBits.AutoModerationExecution,
    // GatewayIntentBits.DirectMessageReactions,
    // GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    // GatewayIntentBits.GuildBans,
    // GatewayIntentBits.GuildEmojisAndStickers,
    // GatewayIntentBits.GuildIntegrations,
    // GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.GuildMessageReactions,
    // GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.GuildPresences,
    // GatewayIntentBits.GuildScheduledEvents,
    // GatewayIntentBits.GuildVoiceStates,
    // GatewayIntentBits.GuildWebhooks,
    // GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
  ],

  // Intents for Development
  canary: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
  ]
}

export const LunaryPartials = [
  Partials.User,
  Partials.Channel,
  Partials.Message,
  Partials.Reaction,
  Partials.GuildMember,

  Partials.User,
  Partials.Channel,
  Partials.GuildMember,
  Partials.Message,
  // Partials.Reaction,
  // Partials.GuildScheduledEvent,
  // Partials.ThreadMember,
]

export const LunaryActivityType = ActivityType;
