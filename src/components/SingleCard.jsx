import './singlecard.css'

const SingleCard = ({card,handleChoice}) => {
  
    const handleCard = () => {
           handleChoice(card)
    }

  return (
    <div className="card" >
        <div>
            <img src={card.src} alt="card front" className="front" />
            <img onClick={handleCard}src="/img/cover.png" alt="back of the card" className="back" />
        </div>
  </div>
  )
}

export default SingleCard
