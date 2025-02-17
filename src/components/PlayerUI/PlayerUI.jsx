import styles from './PlayerUI.module.css'
import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'


export default function PlayerUI({
  coins,
  score
}) {
  const [showModal, setShowModal] = useState(false);
  const rulesRef = useRef(null);

  const handleModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal && rulesRef.current) {
      rulesRef.current.showModal();
    }
  }, [showModal]);

  return (
    <>
      <div>
        <div className={styles.playerData}>
          <h2>🧁: {coins}</h2>
          <button
            onClick={handleModal}
            className={styles.rulesBtn}
          >
            rules
          </button>
          <h2>🍪: {score}</h2>
        </div>

      </div>

      {showModal && (
        <dialog ref={rulesRef} className={styles.rulesContainer}>
          <article className={styles.rulesContent}>
            <h1>Game Rules</h1>
            <h2>Welcome to Piece of Cake!</h2>
            <p>
              Your mission is to earn as many 🍪 as possible.
            </p>
            <p>
              Every time you drop a cake piece onto the baking tray, you earn one 🍪 for each tray cell it covers. But watch out – you can’t go off the edge, overlap already-placed pieces, or cover pieces that already sport cherries!
            </p>
            <p>
              If you manage to completely encircle a cake piece with a cherry on it, you unlock a special Single Piece. This little bonus must be played immediately (or you can choose to reroll if you're feeling extra adventurous).
            </p>
            <p>
              Placing over 🧁 adds them to your stash. But they aren't just for decoration!
              You earn bonus points based on the number of 🧁 in your stash, when encircle a cherry.
              You can also spend a 🧁 to reroll for a new, random cake piece.
              But be careful: surrounding a cherry piece gives you extra points depending on how many 🧁 you still have, and at the end of the game, every leftover 🧁 adds even more bonus points to your final score.
            </p>
            <p>
              If you manage to fill the entire baking tray, you'll score an extra bonus based on the total number of 🍪 you've raked in so far.
            </p>
            <p>So get ready to mix, bake, and strategize your way to the tastiest victory ever. Remember, it's all just a piece of cake!</p>
            <button
            className={styles.rulesBtn}
              onClick={() => {
                rulesRef.current.close();
                handleCloseModal();
              }}
              >Close
            </button>
          </article>
        </dialog>
      )}
    </>
  );
}

PlayerUI.propTypes = {
  coins: PropTypes.number.isRequired,
  setCoins: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired
}
