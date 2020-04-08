import React from 'react'

// displays the given course
const Course = ({course}) => {
    let name = course.name
    let key = course.id
    
    return (
      <div className='course' key={key}>
          <Header title={name} />
          <Content parts={course.parts} />
      </div>
    )
  }

// displays a given title as header
const Header = ({title}) => <h1>{title}</h1>

// displays a given part as paragraph
const Part = ({part}) => <p>{part.name} {part.exercises}</p>

// displays the sum of exercises in all parts
const Total = ({parts}) => {
var sum = parts.reduce((sum, part) => {
    sum += part.exercises
    return sum
}, 0)
return <p><b>total of {sum} exercises</b></p>
}

// displays the content of a parts array
const Content = ({parts}) => {
    return (
      <div className='content'>
        {parts.map(part => <Part part={part} key={part.id} />)}
        <Total parts={parts} />
      </div>    
    )
}

export default Course