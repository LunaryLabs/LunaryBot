await import("reflect-metadata");

import { DataSource } from 'typeorm';
import { pino } from '$lib/Logger';

const url = new URL(String(process.env["DB_URL"]))

const dbHost = String(process.env["DB_HOST"])
const dbPort = Number(process.env["DB_PORT"])

const dbUser = String(process.env["DB_USER"])
const dbPass = String(process.env["DB_PASS"])

const dbName = String(process.env["DB_NAME"])

export const CockroachDataSource = new DataSource({
  type: "cockroachdb",

  // DB Info
  url: url.toString(),
  database: dbName,

  // Connection
  host: dbHost,
  port: dbPort,

  // Credentials
  username: dbUser,
  password: dbPass,

  // Connection Options
  ssl: true
})

await CockroachDataSource.initialize()
pino.info("[*] Data Source has been initialized!");
