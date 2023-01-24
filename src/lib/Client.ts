import { Client, BitFieldResolvable, GatewayIntentsString, GatewayIntentBits } from 'discord.js'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

import type { ICommand } from '$types/Command'

export class Lunary {
  token: string;
  intents: BitFieldResolvable<GatewayIntentsString, number>;
  client: Client;
  commands: Map<string, object>;

  constructor() {
    this.token = process.env['TOKEN'] ?? ''
    this.intents = [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    
    this.commands = new Map<string, object>() //como faz isso no ts AAAAAA
  
    this.client = new Client({
      intents: this.intents,
    })

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
        console.log(commandClassFile)
        const commandFi = (await import(commandClassFile));
        console.log(commandFi)
        const commandClass = new commandFi.Command()
        
        this.commands.set(commandClass.data.name, commandClass.data)
        console.log(`[/] comando ${commandClass.data.name} carregado com sucesso`)
      }
    }
  }

  async loadEvents(): Promise<void> {
    const categoriesDir = new URL('../events/', import.meta.url)
    const categories = await readdir(categoriesDir);

    for await (const category of categories) {
      const commandsDir = new URL(category, categoriesDir)
      const commands = await readdir(commandsDir)

      for await (const command of commands) { //pera vou fazer um cmd de base la
        const commandClassFile = join(categoriesDir.toString(), category, command)
        const commandFi = (await import(commandClassFile));
        console.log(commandFi)
        const commandClass = new commandFi.Command()
        console.log(commandClass)
        this.commands.set(commandClass.event, commandClass.data)
        console.log(`[+] Evento ${commandClass.event} carregado com sucesso`)

        this.client.on(`${commandClass.event}`, commandClass.runner)
      }
    }
  }

  //bora fazer o login antes só pra ver como ta

  login() {
    this.client.login(this.token)
  }
}