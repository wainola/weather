const fetch = require('node-fetch')
const { Pool } = require('pg')

const pool = new Pool()

const { API_KEY: api_key, LAT: lat, LON: lon } = process.env

const url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}?lan=es`

class OpenWeather {
  async forecast(request, response){
    const r = await fetch(url)
    const rJson = await r.json()
    const { latitude, longitude, timezone, currently: { summary, apparentTemperature, temperature } } = rJson
    
    const insertIntoWeatherTable = `
    INSERT INTO weather_data(latitude, longitude, time_zone, summary, aparent_temperature, temperature) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *
    `

    const weatherValues = [
      latitude,
      longitude,
      timezone,
      summary,
      apparentTemperature,
      temperature
    ]

    try {
      const resultQuery = await pool.query(insertIntoWeatherTable, weatherValues)
      const afterInsertion = resultQuery.rows[0]
      return response.status(200).json({ data: afterInsertion })
    } catch (err) {
      return response.status(500).json({error: err, info: 'internal server error' })
    }
  }
}

module.exports = new OpenWeather()