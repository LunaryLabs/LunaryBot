import { Discord, SlashGroup } from "discordx";

@Discord()
@SlashGroup({ name: 'economy', description: 'Economy Commands' })
export abstract class Economy {}
