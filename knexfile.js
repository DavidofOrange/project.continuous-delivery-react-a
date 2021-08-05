require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "127.0.0.1",
      user: process.env.REACT_APP_USER,
      password: process.env.REACT_APP_PW,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "migrations",
      directory: "./migrations",
    },
    seeds: {
      directory: "./data",
    },
  },
  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "migrations",
      directory: "./migrations",
    },
    seeds: {
      directory: "./data",
    },
  },
};
