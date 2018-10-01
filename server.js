require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const OpenWeather = require('./openWeather/OpenWeather')

const { PORT: port } = process.env

const app = express()
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/weather', OpenWeather.forecast)

app.listen(port, (err) => {
  if(err){
    console.error(err)
  }

  console.log(`Server running at port ${port}`)
})