const db = require('../db')

const getAllConcerts = async (req, res) => {
  const { page, limit } = req.query
  const { rows } = await db.query('SELECT * FROM concerts LEFT JOIN venues ON concerts.venue_id = venues.venue_id WHERE concert_date >= CURRENT_DATE ORDER BY concert_date ASC LIMIT $1 OFFSET $2', [limit, (page - 1) * limit])
  res.send(rows)
}

const getConcertById = async (req, res) => {
  const id = req.params.id
  const { rows } = await db.query('SELECT * FROM concerts WHERE concert_id = $1', [id])
  res.send(rows)
}

const createConcert = async (req, res) => {
  let insertedRows = []
  for (let i = 0; i < req.body.length; i++) {
    const { band_name, venue_name, ticket_link, showtime, concert_date } = req.body[i]
    const { rows } = await db.query(
    'WITH e AS(INSERT INTO venues (venue_name) VALUES ($1) ON CONFLICT ON CONSTRAINT venues_venue_name_key DO NOTHING RETURNING venue_id) SELECT * FROM e UNION SELECT venue_id FROM venues WHERE venue_name=$1', [venue_name])
    const concert = await db.query(
    'INSERT INTO concerts (band_name, venue_id, ticket_link, showtime, concert_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [band_name, rows[0].venue_id, ticket_link, showtime, concert_date])
    insertedRows.push(concert.rows)
  }
  res.send(insertedRows)
}

module.exports = {
  getAllConcerts,
  createConcert,
  getConcertById
}