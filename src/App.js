import React, {useState, useEffect} from "react"
import Dice from "./Dice"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {
  // Dice State 
  const [dices, setDices] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  // All new Dice
  function allNewDice() {
    let ramdomNumArr = []
    for (let i = 0; i < 10; i++) {
      let randomNum = Math.floor(Math.random() * 6) + 1
      ramdomNumArr.push({
        value: randomNum, 
        isHeld: false,
        id: nanoid()
      })
    }
    return ramdomNumArr
  }
 // Hold Dice
 function holdDice(id) {
  setDices(oldDice => oldDice.map(dice => {
    return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
  }))
 }
  
  let diceElements = dices.map((dice) => <Dice holdDice={holdDice} key={dice.id} id={dice.id} value={dice.value} isHeld={dice.isHeld} />)

  // Generate Dice
  function generateDice(){
    if(!tenzies) {
      setDices(newDice => newDice.map(dice => {
        return dice.isHeld ? dice : {
          value: Math.floor(Math.random() * 6) + 1, 
          isHeld: false,
          id: nanoid()
        }
      }))
    }else {
      setTenzies(false)
      setDices(allNewDice())
    }
    
  }

  // Win Game
  
  useEffect(() => {
    const allHold = dices.every(dice => dice.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(dice => dice.value === firstValue)
    if(allHold && allSameValue) {
      setTenzies(true)
    }
  },[dices])
  
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="btn" onClick={generateDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
