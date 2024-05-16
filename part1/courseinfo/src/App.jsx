import { useState } from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = ({ part }) => {
  return <p>{part.name}: {part.exercises}</p>
}

const Course = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development'
  const courseParts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ]

  return (
    <div>
      {/* <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
      <Header course={course} />
      <Course parts={courseParts} />
    </div>
  )
}

export default App