import { Client, BitFieldResolvable, GatewayIntentsString, GatewayIntentBits, SlashCommandBuilder } from 'discord.js'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

import type { ICommand } from '$types/Command'
import type { IEvent } from '$types/Event'

export class Lunary {
  private token: string;
  private intents: BitFieldResolvable<GatewayIntentsString, number>;
  public client: Client;
  public commands: Array<ICommand>;

  constructor() {
    this.token = process.env['TOKEN'] ?? ''
    this.intents = [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    
    this.commands = []; 
  
    this.client = new Client({
      intents: this.intents,
    })

    this.login()
    this.loadCommands()
    this.loadEvents()
  }

  async loadCommands(): Promise<void> {
    const categoriesDir = new URL('../commands/', import.meta.url)
    const categories = await readdir(categoriesDir);

    for await (const category of categories) {
      const commandsDir = new URL(category, categoriesDir)
      const commands = await readdir(commandsDir)

      for await (const command of commands) { //pera vou fazer um cmd de base la
        const commandClassFile = join(categoriesDir.toString(), category, command)
        const commandFile = (await import(commandClassFile)).default;
        const commandClass: ICommand = new commandFile()
        
        this.commands.push(commandClass)
        console.log(`[/] comando ${commandClass.data.name} carregado com sucesso`)
      }
    }
  }

  async loadEvents(): Promise<void> {
    const categoriesDir = new URL('../events/', import.meta.url)
    const categories = await readdir(categoriesDir);

    for await (const category of categories) {
      const eventsDir = new URL(category, categoriesDir)
      const events = await readdir(eventsDir)

      for await (const event of events) {
        const eventClassFile = join(categoriesDir.toString(), category, event)
        const eventFile = (await import(eventClassFile)).default;
        const eventClass: IEvent = new eventFile();

        console.log(`[+] Evento ${eventClass.event} carregado com sucesso`)
        this.client.on(eventClass.event, eventClass.runner)
      }
    }
  }

  login() {
    this.client.login(this.token)
  }
}