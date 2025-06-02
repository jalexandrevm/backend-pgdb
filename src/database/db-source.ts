import { DataSource } from "typeorm"

export const myDbSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "sistemadb",
  entities: ["src/database/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  logging: true,
  synchronize: false, // Alterado para false para evitar conflitos com migrations
  useUTC: false,
  extra: {
    connectionLimit: 10, // Limite de conexões
    max: 10, // Máximo de conexões
    idleTimeoutMillis: 3600000, // Tempo limite de inatividade
  },
})
