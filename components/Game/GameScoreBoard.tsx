import styles from "../../styles/GameScoreBoard.module.scss";
import Image from "next/image";

export default function GameScoreBoard(props) {
  const { userScore, userLife, results } = props;
  let lifeIconArray = [];
  for (let i = 3; i > 0; i--) {
    lifeIconArray.push(
      <Image
        src={require("../../assets/sprites/healthicon.png")}
        width={30}
        height={30}
        className={userLife - i >= 0 ? styles.healthIcon : styles.healthIconNoShow}
        alt="Life"
      ></Image>
    );
  }
  return (
    <div className={styles.scoreBoardContainer}>
      <div className={styles.scoreContainer}>
        SCORE
        <div className={styles.scoreNumber}>
          <div className={results ? styles.addScoreAnimation : styles.addScoreAnimationHide}>+1</div>&nbsp;&nbsp;{userScore}
        </div>
        <div className={styles.goldIconContainer}>
          <Image src={require("../../assets/sprites/gold.png")} width={30} height={30} className={styles.goldIcon} alt="Gold"></Image>
        </div>
      </div>
      <div className={styles.lifeContainer}>
        {lifeIconArray.map((icon, index) => {
          return <div key={index}>{icon}</div>;
        })}
        <div className={styles.livesWord}>&nbsp;LIVES</div>
      </div>
    </div>
  );
}
