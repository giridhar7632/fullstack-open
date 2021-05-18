import React from 'react'

const Filter = (props) => {
  const handleFilterChange = (e) => {
    props.setFilter(e.target.value)
  }
  return (
    <div>
      <form>
        name:{' '}
        <input
          placeholder='filter name'
          value={props.filter}
          onChange={handleFilterChange}
        />
      </form>
    </div>
  )
}

export default Filter
