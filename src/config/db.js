module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  // [max, min]: maximum, minumum number of connection in pool
  // min: minimum number of connection in pool
  // idle: maximum time, in milliseconds, that a connection can be idle before being released
  // acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};