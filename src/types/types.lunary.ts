import { Partials, ActivityType } from 'discord.js'
let LunaryIntentsBits = {
    all: 3276799,
    Verify: 3243773
}

let LunaryPartials = [
    Partials.User,
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.ThreadMember,
  ]

let LunaryActivityType = ActivityType

export {
    LunaryIntentsBits,
    LunaryPartials,
    LunaryActivityType
}