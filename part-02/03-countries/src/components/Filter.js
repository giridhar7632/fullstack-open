import React from 'react'

const Filter = (props) => {
  const handleFilterChange = (e) => {
    props.setFilter(e.target.value)
    props.setShow(false)
  }
  return (
    <div>
      Search for: <input value={props.filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
