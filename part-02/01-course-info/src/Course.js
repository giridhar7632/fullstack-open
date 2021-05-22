import React from 'react'

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name}: <b>{exercises}</b>
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((i) => (
        <Part key={i.name} name={i.name} exercises={i.exercises} />
      ))}
    </>
  )
}

const Total = ({ parts }) => {
  
  const total =   parts.reduce((s, p) => s+p.exercises , 0)
  return (
    <p>
      Total Exercises: <b>{total}</b>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course