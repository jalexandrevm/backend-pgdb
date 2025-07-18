import { DataSource } from "typeorm"

export const myDbSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'sistemadb',
  entities: [process.env.TYPEORM_ENTITIES || "src/database/entities/*.ts"],
  migrations: [process.env.TYPEORM_MIGRATIONS || "src/database/migrations/*.ts"],
  logging: process.env.NODE_ENV !== 'production',
  synchronize: false, // Nunca use true em produção
  useUTC: false,
  extra: {
    connectionLimit: 10,
    max: 10,
    idleTimeoutMillis: 3600000,
  },
})
