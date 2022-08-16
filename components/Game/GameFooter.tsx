import styles from "../../styles/GameFooter.module.scss";
import { FaQuestionCircle, FaFlagCheckered } from "react-icons/fa";

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
              <FaFlagCheckered className={styles.resultIcon}></FaFlagCheckered>
            </button>
          </div>
        }
      </div>
      <div className={styles.newGameButtonAllContainer}>
        <div className={styles.newGameButtonCircle}></div>
        <button
          className={getAnswer && userLife !== 0 ? styles.newGameButtonPulse : styles.newGameButton}
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
          <FaQuestionCircle className={styles.questionIcon}></FaQuestionCircle>
        </button>
      </div>
    </div>
  ) : null;
}
