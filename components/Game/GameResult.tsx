import styles from "../../styles/GameResult.module.scss";

export default function GameResult(props) {
  const { userScore, handleNewGame } = props;
  return (
    <div className={styles.resultScreenContainer}>
      <div className={styles.statContainer}>
        <div className={styles.statDetailContainer}>
          <div className={styles.statDetailNumber}>0</div>
          <div className={styles.statDetailText}>
            <div>Played</div>
          </div>
        </div>
        <div className={styles.statDetailContainer}>
          <div className={styles.statDetailNumber}>{userScore}</div>
          <div className={styles.statDetailText}>
            <div>Current</div>
            <div>Streak</div>
          </div>
        </div>
        <div className={styles.statDetailContainer}>
          <div className={styles.statDetailNumber}>0</div>
          <div className={styles.statDetailText}>
            <div>Highest</div>
            <div>Streak</div>
          </div>
        </div>
      </div>
      <div className={styles.roleStatContainer}>
        <div>Role Distribution</div>
        <div>Your best roles guess is zzzz work on later</div>
      </div>
      <div className={styles.playAgainButtonContainer}>
        <button
          className={styles.playAgainButton}
          onClick={() => {
            handleNewGame();
          }}
        >
          Play again
        </button>
      </div>

      <div className={styles.socialContainer}>Share</div>
    </div>
  );
}
