import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios.get(`https://restcountries.eu/rest/v2/all/`).then((response) => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} setShow={setShow} />
      <Countries
        countries={countries}
        filter={filter}
        show={show}
        setShow={setShow}
      />
    </>
  )
}

export default App
