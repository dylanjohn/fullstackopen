import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes)
  const mostVotedIndex = votes.indexOf(maxVotes)

  if (maxVotes === 0) {
    return null
  }

  return (
    <>
      <h3>Anecdote with the most votes</h3>
      <p>{anecdotes[mostVotedIndex]}</p>
      <p>has {votes[mostVotedIndex]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const handleNextAnecdote = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length)
    if (randomIndex === selected) {
      randomIndex = (randomIndex + 1) % anecdotes.length
    }
    setSelected(randomIndex)
  }

  return (
    <>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNextAnecdote} text="next anecdote"/>

      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  )
}

export default App