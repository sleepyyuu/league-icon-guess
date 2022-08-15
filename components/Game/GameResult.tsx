import styles from "../../styles/GameResult.module.scss";
import { useEffect } from "react";

export default function GameResult(props) {
  const { userScore, handleNewGame, highestStreak, numGamesPlayed } = props;

  return (
    <div className={styles.resultScreenContainer}>
      <div className={styles.statContainer}>
        <div className={styles.statDetailContainer}>
          <div className={styles.statDetailNumber}>{numGamesPlayed}</div>
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
          <div className={styles.statDetailNumber}>{highestStreak}</div>
          <div className={styles.statDetailText}>
            <div>Highest</div>
            <div>Streak</div>
          </div>
        </div>
      </div>
      <div className={styles.roleStatContainer}>
        <div>Role Distribution</div>
        <div>Coming soon!</div>
        <div className={styles.roleDetailContainer}>
          <div className={styles.roleDetail}>
            <div className={styles.roleDetailText}>TOP</div>
            <div className={styles.roleDetailNumber}>0%</div>
          </div>
          <div className={styles.roleDetail}>
            <div className={styles.roleDetailText}>JUNG</div>
            <div className={styles.roleDetailNumber}>0%</div>
          </div>
          <div className={styles.roleDetail}>
            <div className={styles.roleDetailText}>MID</div>
            <div className={styles.roleDetailNumber}>0%</div>
          </div>
          <div className={styles.roleDetail}>
            <div className={styles.roleDetailText}>ADC</div>
            <div className={styles.roleDetailNumber}>0%</div>
          </div>
          <div className={styles.roleDetail}>
            <div className={styles.roleDetailText}>SUP</div>
            <div className={styles.roleDetailNumber}>0%</div>
          </div>
        </div>
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

      <div className={styles.socialContainer}>
        <div className={styles.shareContainer}>Share</div>
        <div
          className={styles.linkContainer}
          onClick={() => {
            navigator.clipboard.writeText("testurl.com");
          }}
        >
          testurl.com
        </div>
      </div>
    </div>
  );
}
