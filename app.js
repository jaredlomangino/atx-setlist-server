const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { createConcert, getAllConcerts, getConcertById } = require('./queries/concerts.js')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/concerts', getAllConcerts)
app.get('/concerts/:id', getConcertById)
app.post('/concert', createConcert)

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })