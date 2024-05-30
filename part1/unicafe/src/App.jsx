import { useState } from 'react'

const App = () => {
  // const [ counter, setCounter ] = useState(0)
  // console.log('rendering with counter value', counter)

  // const increaseByOne = () => setCounter(counter + 1)
  // const increaseByTwo = () => setCounter(counter + 2)
  // const decreaseByOne = () => setCounter(counter - 1)
  // const setToZero = () => setCounter(0)

  // const Display = ({ counter }) => <div>{counter}</div>

  // const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

  // const [clicks, setClicks] = useState({
  //   left: 0, right: 0
  // })

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    // const newClicks = { 
    //   ...clicks, 
    //   left: clicks.left + 1 
    // }

    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)

  }

  const handleRightClick = () => {
    // const newClicks = { 
    //   ...clicks, 
    //   right: clicks.right + 1 
    // }
 
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  return (
    <>
      {/* <Display counter={counter}/>
      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={increaseByTwo}
        text='plus 2'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      /> */}

      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>total {total}</p>
    </>
  )
}

export default App