import React from 'react'
import Person from './Person'

const Persons = (props) => {
  return (
    <>
      {props.persons.map((person) =>
        person.name.toLowerCase().includes(props.filter.toLowerCase())
          ? [
              <Person
                key={person.name}
                person={person}
              />,
            ]
          : []
      )}
    </>
  )
}

export default Persons
