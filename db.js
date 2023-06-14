const { Pool } = require('pg')
 
const pool = new Pool({
    user: 'postgres',
    host: 'concerts.czoxsrn581ri.us-east-2.rds.amazonaws.com',
    database: 'concert_db',
    password: 'Cudizone444!Cudi',
    port: 5432
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}