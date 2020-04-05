import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// returns a random integer between 0 and the max value (inclusive)
const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

// displays anecdote and its rating in two paragraphs
const AnecdoteDisplay = ({text, votes, isAnecdoteOfTheDay}) => {

  let subtext = ''

  if (isAnecdoteOfTheDay){
    subtext = 'has ' + votes + ' votes'
  }
  else{
    if (votes != 0){
      subtext = 'has ' + votes + ' votes'
    }
  }
  return(
    <div>
      <p>{text}</p>
      <p>{subtext}</p>
    </div>
  )
}

// a button with text
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// a list of programming anecdotes to be displayed and voted on
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  // change the currently displayed anecdote to a randomly chosen on from anecdotes array
  const changeSelected = () => setSelected(getRandomInt(anecdotes.length))

  // increases the vote for the currently displayed anecdote
  const increaseVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const DisplayHighestRatedAnectdote = () => {

    let highestRating = 0
    let indexOfHighestRating = -1;
    let voteText = ''

    for (var i = 0; i < points.length; i++){
      if (points[i] > highestRating){
        highestRating = points[i]
        indexOfHighestRating = i
      }
    }
    
    return(
      <AnecdoteDisplay text={anecdotes[indexOfHighestRating]} votes={highestRating} isAnecdoteOfTheDay={false} />
    )
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <AnecdoteDisplay text={props.anecdotes[selected]} votes={points[selected]} isAnecdoteOfTheDay={true} />
        <Button onClick={increaseVote} text='vote' />
        <Button onClick={changeSelected} text='next anecdote' />
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <DisplayHighestRatedAnectdote />
      </div>

    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)