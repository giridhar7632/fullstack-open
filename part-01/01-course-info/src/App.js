import React from 'react'

const Header = (props) => {
return <h1>{ props.course.name }</h1>
}

const Part = ({ name, exercises}) => {
  return <p>{name}: <b>{exercises}</b></p>
}

const Content = ({ parts }) => {
return(
  <>
    {parts.parts.map((i) => <Part key={i.name} name={i.name} exercises={i.exercises} />
    )}
  </>
)
}

const Total = ({ parts }) => {
  let sum = 0
  parts.parts.forEach((i) => sum += i.exercises)
return <p>Total Exercises: <b>{ sum }</b></p>
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </>
  )
}

export default App;
