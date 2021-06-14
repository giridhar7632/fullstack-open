import React from 'react'

const Persons = ({ filterPersons, handleDelete }) => {
  return filterPersons.map((person, i) => (
    <div key={i}>
      {person.name} - {person.number}{' '}
      <button onClick={() => handleDelete(person.id, person.name)}>
        delete
      </button>
    </div>
  ))
}

export default Persons
