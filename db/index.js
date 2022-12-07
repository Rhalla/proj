const Pool = require('pg').Pool
const db = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "postgres"
})

module.exports = db