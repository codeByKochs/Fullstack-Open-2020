import React from 'react'

// displays the given course
const Course = ({course}) => {
    let name = course.name
    
    return (
      <div>
        <div>
          <Header title={name} />
        </div>
        <div>
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      </div>
    )
  }

// displays a given title as header
const Header = ({title}) => <h1>{title}</h1>

// displays a given part as paragraph
const Part = ({part, exercises, key}) => <p key={key}>{part} {exercises}</p>

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
      <div>
        {parts.map(part => <Part part={part.name} exercises={part.exercises} key={part.key} />)}
      </div>
    )
}

export default Course