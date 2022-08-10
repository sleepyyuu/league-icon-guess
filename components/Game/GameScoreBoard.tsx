import styles from "../../styles/GameScoreBoard.module.scss";

export default function GameScoreBoard(props) {
  const { userScore, userLife } = props;
  return (
    <div className={styles.scoreBoardContainer}>
      <div className={styles.scoreContainer}>Score: {userScore}</div>
      <div className={styles.lifeContainer}>Lives Left: {userLife}</div>
    </div>
  );
}
