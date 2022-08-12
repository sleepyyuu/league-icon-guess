import styles from "../../styles/GameFooter.module.scss";

export default function GameFooter(props) {
  const { setShowInitialMenu, userLife, getAnswer, gameCount, setGameCount, setShowEndMenu, showButtons } = props;

  return showButtons ? (
    <div className={styles.gameFooter}>
      <div className={styles.endMenuContainer}>
        {
          <div className={userLife === 0 ? styles.showEndMenu : styles.hideEndMenu}>
            <button
              className={styles.endMenuButton}
              onClick={() => {
                setShowEndMenu(true);
              }}
            >
              📊
            </button>
          </div>
        }
      </div>
      <div className={styles.newGameButtonAllContainer}>
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
          Next!
        </button>
      </div>

      <div className={styles.initialMenuContainer}>
        <button
          className={styles.initialMenuButton}
          onClick={() => {
            setShowInitialMenu(true);
          }}
        >
          ❓
        </button>
      </div>
    </div>
  ) : null;
}
