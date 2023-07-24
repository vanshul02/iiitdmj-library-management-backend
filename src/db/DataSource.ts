import "reflect-metadata"
import * as dotenv from "dotenv";
import { DataSource } from "typeorm"
dotenv.config({ path: __dirname + '/../.env' });

export const AppDataSource = new DataSource({
    type: process.env.DBTYPE as any | 'postgres',
    host: process.env.DBHOST,
    port: process.env.DBPORT as any | 5432,
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    synchronize: true,
    logging: false,
    entities: ["src/db/entity/*.ts"],
    migrations: ["src/db/migration/*.ts"],
    subscribers: [],
})
