import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetailed = ({ country }) => {
  const [temperature, setTemperature] = useState('')
  const [icon, setIcon] = useState('')
  const [iconWord, setIconWord] = useState('')
  const [wind, setWind] = useState('')
  const [windDirection, setWindDirection] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
      )
      .then((res) => {
        setTemperature(res.data.main.temp)
        setIcon(
          `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
        )
        setIconWord(res.data.weather[0].description)
        setWind(res.data.wind.speed)
        setWindDirection(res.data.wind.deg)
      })
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_2}>{language.name}</li>
        ))}
      </ul>
      <div>
        <img src={country.flag} height='128' alt={country.name} />
      </div>
      <h2>Weather in {country.capital}</h2>
      <div>
        <b>temperature: </b>
        {temperature} °C
      </div>
      <img src={icon} alt={iconWord} />
      <div>
        <b>wind: </b>
        {wind} m/s direction {windDirection} degrees
      </div>
    </div>
  )
}

export default CountryDetailed
