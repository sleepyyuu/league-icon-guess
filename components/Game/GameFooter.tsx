import styles from "../../styles/GameFooter.module.scss";

export default function GameFooter(props) {
  const { setShowInitialMenu, userLife, getAnswer, gameCount, setGameCount, setShowEndMenu } = props;

  return (
    <div className={styles.gameFooter}>
      <div>
        <button
          onClick={() => {
            setShowInitialMenu(true);
          }}
        >
          toggle modal
        </button>
      </div>
      <div>
        <div className={styles.newGameButtonCircle}></div>
        <button
          className={styles.newGameButton}
          onClick={() => {
            if (userLife === 0 || !getAnswer) {
              return;
            }
            setGameCount(gameCount + 1);
          }}
        >
          next round
        </button>
      </div>
      <div>
        {
          <div className={userLife === 0 ? styles.showEndMenu : styles.hideEndMenu}>
            <button
              onClick={() => {
                setShowEndMenu(true);
              }}
            >
              result screen
            </button>
          </div>
        }
      </div>
    </div>
  );
}
