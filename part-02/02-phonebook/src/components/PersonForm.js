import React from 'react'

const PersonForm = (props) => {
  const handleNameChange = (e) => {
    props.setNewName(e.target.value)
  }
  const handleNumChange = (e) => {
    props.setNewNum(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!props.persons.map((person) => person.name).includes(props.newName)) {
      const personObj = {
        name: props.newName,
        number: props.newNum,
      }
      props.setPersons([...props.persons, personObj])
      props.setNewName('')
      props.setNewNum('')
    } else {
      alert(`${props.newName} already exists in your directory!`)
      props.setNewName('')
    }
  }
  return (
    <div>
      <form>
        <div>
          name:{' '}
          <input
            value={props.newName}
            onChange={handleNameChange}
            placeholder='Enter a name'
          />
        </div>
        <div>
          number:{' '}
          <input
            value={props.newNum}
            onChange={handleNumChange}
            placeholder='phone number'
          />
        </div>
        <div>
          <button type='submit' onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
