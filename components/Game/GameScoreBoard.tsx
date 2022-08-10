import styles from "../../styles/GameScoreBoard.module.scss";
import Image from "next/image";

export default function GameScoreBoard(props) {
  const { userScore, userLife } = props;
  return (
    <div className={styles.scoreBoardContainer}>
      <div className={styles.scoreContainer}>
        Score: {userScore}
        <div className={styles.goldIconContainer}>
          <Image src={require("../../assets/sprites/gold.png")} width={30} height={30} className={styles.goldIcon} alt="Gold"></Image>
        </div>
      </div>
      <div className={styles.lifeContainer}>Lives Left: {userLife}</div>
    </div>
  );
}
