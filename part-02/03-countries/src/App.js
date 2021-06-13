import React, { useState } from 'react'
import Countries from './components/Countries'

const style = {
  margin: '20px',
}

const App = () => {
  const [filter, setFilter] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  return (
    <div style={style}>
      <div>
        find countries <input onChange={handleChange} value={filter}></input>
      </div>
      <Countries filter={filter} />
    </div>
  )
}
export default App
