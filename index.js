const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { createConcert, getAllConcerts, getConcertById } = require('./queries/concerts.js')

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors({
  origin:"http://localhost:3000"
}))

app.get('/concerts', getAllConcerts)
app.get('/concerts/:id', getConcertById)
app.post('/concert', createConcert)

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })