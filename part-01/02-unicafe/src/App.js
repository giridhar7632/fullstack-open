import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistic = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const all = good + neutral + bad

  if (all > 0) {
    const average = (good - bad) / all
    const positive = (good / all) * 100
    return (
      <table>
        <tbody>
          <Statistic label='good' value={good} />
          <Statistic label='neutral' value={neutral} />
          <Statistic label='bad' value={bad} />
          <Statistic label='all' value={all} />
          <Statistic label='average' value={average} />
          <Statistic label='positive' value={`${positive}%`} />
        </tbody>
      </table>
    )
  } else {
    return <p>No feedback given!!!</p>
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
