import { Column, Entity, } from "typeorm";

import { CockroachDataSource } from "../dataSource";
import { Snowflake } from "discord.js";
import { randomUUID } from "crypto";

@Entity()
class User {
  @Column({ primary: true, default: randomUUID() })
  uuid!: string

  @Column({ default: new Date() })
  createdAt!: Date

  @Column({ nullable: false })
  name!: string

  @Column({ nullable: false, unique: true })
  id!: Snowflake
}

export const UserRepository = CockroachDataSource.getRepository(User);
