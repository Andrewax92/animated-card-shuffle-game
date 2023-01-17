import './singlecard.css'

const SingleCard = ({card,handleChoice,flipped,disabled}) => {
  
    const handleCard = () => {
       if(!disabled && !flipped){
           handleChoice(card)
        }
           
    }

  return (
    <div className={flipped ? "card is-flipped" : "card"} >
              <img className="card__face card__face--front" onClick={handleCard} src="/img/cover.png" alt="back of the card"  />
              <img className="card__face card__face--back" src={card.src} alt="card front"  />
    </div>
  )
}

export default SingleCard
