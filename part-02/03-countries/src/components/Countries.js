import React, { useState, useEffect } from 'react'
import CountryDetailed from './CountryDetailed'
import axios from 'axios'

const Countries = ({ filter }) => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState({})

  useEffect(() => {
    if (filter !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${filter}`)
        .then((response) => {
          setCountries(response.data)
        })
    }
  })

  const handleShow = (country) => {
    setCountry(country)
  }

  return (
    <div>
      {countries.length > 10 && <p>too many matches, specify another filter</p>}
      {countries.length < 10 &&
        countries.length !== 1 &&
        countries.map((country) => (
          <div key={country.name}>
            {country.name}
            <button onClick={() => handleShow(country)}>show</button>
          </div>
        ))}
      {country.languages !== undefined && <CountryDetailed country={country} />}
    </div>
  )
}

export default Countries
