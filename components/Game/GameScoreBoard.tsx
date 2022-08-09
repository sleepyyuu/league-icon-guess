import styles from "../../styles/GameScoreBoard.module.scss";

export default function GameScoreBoard(props) {
  const { userScore, userLife } = props;
  return (
    <div className={styles.scoreBoardContainer}>
      <div className={styles.scoreContainer}>score : {userScore}</div>
      <div className={styles.lifeContainer}>lives remaining : {userLife}</div>
    </div>
  );
}
