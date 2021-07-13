import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import Select from 'react-select'

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [option, setOption] = useState(null)

  const [setBirthYear, result] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error.graphQLErrors[0].message)
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('Error')
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()
    setBirthYear({ variables: {name, setBornTo: born*1} })
    setName('')
    setBorn('')
  }
  const options = authors.map(author => ({ value: author.name, label: author.name }))
  return (
    <div>
      <h3>Update birthyear</h3>
      <form onSubmit={submit}>
        <div style={{width: "200px"}}> name: 
        {/* <select value={name} onChange={({target}) => setName(target.value)}>
          {authors.map((a, i) => <option key={i} value={a.name}>{a.name}</option>)}
        </select> */}
        <Select defaultValue={option} onChange={setOption} options={options} />
        </div>
        birth year: <input value={born} onChange={({target}) => setBorn(target.value)} />
        <button type="submit">Sumit</button>
      </form>
    </div>
  )
}

export default EditAuthor
