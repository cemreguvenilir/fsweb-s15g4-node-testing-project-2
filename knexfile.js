// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const sharedConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  seeds: { directory: "./data/seeds" },
  migrations: { directory: "./data/migrations" },
  pool: {
    afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      filename: "./todoApp.db3",
    },
  },
  testing: {
    ...sharedConfig,
    connection: {
      filename: "./testTodoApp.db3",
    },
  },
};
