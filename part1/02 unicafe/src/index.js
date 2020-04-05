import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick} >
      {text}
    </button>
  )
}

const Statistic = ({text, value}) => {
  return (
  <tr>
    <td>
      {text}
    </td>
    <td>
    {value}
    </td>
  </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  // defining statistics
  let total = good + neutral + bad
  let average = (good*1 + neutral*0 + bad*-1)/total
  let goodPercentage = 100*good/total

  if (good + neutral + bad ==0){
    return(
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <div>
      <h2>statistics</h2>
      <table>
        <Statistic text='good' value={good}/>
        <Statistic text='good' value={good}/>
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='bad' value={bad}/>
        <Statistic text='all' value={total}/>
        <Statistic text='average' value={average}/>
        <Statistic text='positive' value={goodPercentage}/>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {setGood(good + 1)}
  const increaseBad = () => {setBad(bad + 1)}
  const increaseNeutral = () => {setNeutral(neutral + 1)}

  return (
    <div>
      <div>
        <h1>give feedback</h1>
      </div>
      <div>
        <Button onClick={increaseGood} text='good'/>
        <Button onClick={increaseNeutral} text='neutral'/>
        <Button onClick={increaseBad} text='bad'/>
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
 
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)