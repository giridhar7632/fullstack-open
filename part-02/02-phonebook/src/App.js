import React, { useEffect, useState } from 'react'
import Message from './components/Message'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { deletePerson, getPersons } from './controllers/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [msg, setMsg] = useState(null)
  const [filter, setFilter] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setFilterPersons(
      persons.filter(
        (person) =>
          person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
    )
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      deletePerson(id)
        .then(() => {
          getPersons().then((data) => setPersons(data))
        })
        .catch((error) => {
          setMsg({ msg: `${name} does not exist`, className: 'error' })
          setTimeout(() => {
            setMsg(null)
          }, 3000)
        })
    }
  }

  useEffect(() => {
    getPersons().then((data) => setPersons(data))
  }, [])

  return (
    <div>
      <h1>Search for</h1>
      <div>
        filter shown with{' '}
        <input onChange={handleFilterChange} value={filter}></input>
      </div>
      <Message notify={msg} />
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} setMsg={setMsg} />
      <h2>Numbers</h2>
      {filter === '' ? (
        <Persons handleDelete={handleDelete} filterPersons={persons} />
      ) : (
        <Persons handleDelete={handleDelete} filterPersons={filterPersons} />
      )}
    </div>
  )
}

export default App
