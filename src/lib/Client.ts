import { ChatInputApplicationCommandData, Client, GatewayIntentBits } from 'discord.js'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

import type { ICommand } from '$types/Command'
import type { IEvent } from '$types/Event'
import { pino } from '$lib/Logger'

export class Lunary {
  private token: string;
  private intents: Array<GatewayIntentBits>;
  public client: Client;
  public commands: Array<ICommand>;

  constructor(token?: string, intents?: Array<GatewayIntentBits>) {
    this.token = String(token ?? process.env['TOKEN']);
    this.intents = intents ?? [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ];
    
    this.commands = new Array();
    
    this.client = new Client({
      intents: this.intents,
    });

    this.login();
    this.loadCommands();
    this.loadEvents();
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
    const categoriesDir = new URL('../events/', import.meta.url);
    const categories = await readdir(categoriesDir);

    for await (const category of categories) {
      const eventsDir = new URL(category, categoriesDir);
      const events = (await readdir(eventsDir)).filter(f => f.endsWith('.ts'));

      for await (const event of events) {
        const eventClassFile = join(eventsDir.toString(), event);
        const eventFile = (await import(eventClassFile)).default;
        const eventClass: IEvent = new eventFile();

        pino.info(`[+] Evento ${eventClass.event} carregado com sucesso`);
        
        switch (eventClass.once) {
          case true: this.client.on(eventClass.event, eventClass.runner);
          case false: this.client.once(eventClass.event, eventClass.runner);
        }
      }
    }
  }

  async login() {
    await this.client.login(this.token);
  }
}