
export default function GameEnd(gameEnded) {
  // console.log(gameEnded);


  return (
    <div> {!gameEnded ? 'GAME OVER' : ''} </div>
  )
}
