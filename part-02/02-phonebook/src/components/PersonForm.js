import React, { useState } from 'react'
import { addPerson, updatePerson } from '../controllers/persons'

const PersonForm = ({ setPersons, persons, setMsg }) => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState()

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumChange = (e) => {
    setNewNum(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const personObj = {
      name: newName,
      number: newNum,
    }
    const exist = persons.find((person) => person.name === newName)
    if (exist !== undefined) {
      if (
        window.confirm(
          `${newName} is already in your phonebook, do you want replace the old number with a new one?`
        )
      ) {
        updatePerson(personObj, exist.id).then((data) => {
          setPersons(
            persons.map((person) => (data.id === person.id ? data : person))
          )
          setMsg({ msg: `Updated ${data.name}`, className: 'success' })
          setTimeout(() => {
            setMsg(null)
          }, 3000)
        })
      }
    } else {
      addPerson(personObj)
        .then((data) => {
          setPersons(persons.concat(data))
          setMsg({ msg: `Added ${data.name}`, className: 'success' })
          setTimeout(() => {
            setMsg(null)
          }, 3000)
        })
        .catch((error) => {
          setMsg({ message: error.response.data.error, className: 'error' })
          setTimeout(() => {
            setMsg(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNum('')
  }
  return (
    <div>
      <form>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={handleNameChange}
            placeholder="Enter a name"
          />
        </div>
        <div>
          number:{' '}
          <input
            value={newNum}
            onChange={handleNumChange}
            placeholder="phone number"
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
