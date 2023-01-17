import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne,] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disable, setDisable] = useState(false)


  // shuffling and array using the modern version of the Fisher–Yates  algorithm
  const shufflecards = (arrayToShuffle) => {

    const array = [...arrayToShuffle, ...arrayToShuffle].map((card) => ({ ...card, id: uuidv4() }))

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    setCards(array)

    setTurns(0)

  }
  // Selecting the card
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  // reset turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisable(false)
  }
  useEffect(() => {
    shufflecards(cardImages)
  }, [])

  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisable(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={() => shufflecards(cardImages)}>New Game</button>
      <div className="card-grid">
        {
          cards.map(card => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disable}
            />
          ))
        }
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App