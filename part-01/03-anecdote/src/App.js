import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ]

  const [selected, setSelected] = useState(0)
  const [most, setMost] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const random = (max) => {
    setSelected(Math.floor(Math.random() * max))
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    console.log(copy)
    setPoints(copy)
    setMost(
      copy.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]
    )
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <span>
        votes: <b>{points[selected]}</b>
      </span>
      <br />
      <button onClick={vote}>vote 👍</button>
      <button onClick={() => random(anecdotes.length)}>next anecdote ⏭</button>
      <hr />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[most]}</p>
      <span>
        votes: <b>{points[most]}</b>
      </span>
    </div>
  )
}

export default App
