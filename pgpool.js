const Pool = require('pg-pool');
const url = require('url')

//const params = url.parse(process.env.DATABASE_URL);
//const auth = params.auth.split(':');

const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
};
/*
const config = {
    user: "petejackerson",
    database: "nbastatistics",
    password: "redsox45",
    host: "localhost",
    port: 5432
}*/

const pool = new Pool(config);
module.exports = {
    query: (text, params, callback) => {
      const start = Date.now()
      return pool.query(text, params, (err, res) => {
        const duration = Date.now() - start
        console.log('executed query', { duration })
        callback(err, res)
      })
    },
}