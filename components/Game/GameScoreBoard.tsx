import styles from "../../styles/GameScoreBoard.module.scss";
import Image from "next/image";

export default function GameScoreBoard(props) {
  const { userScore, userLife } = props;
  let lifeIconArray = [];
  for (let i = 0; i < userLife; i++) {
    lifeIconArray.push(
      <Image src={require("../../assets/sprites/healthicon.png")} width={30} height={30} className={styles.goldIcon} alt="Life"></Image>
    );
  }
  return (
    <div className={styles.scoreBoardContainer}>
      <div className={styles.scoreContainer}>
        SCORE <div className={styles.scoreNumber}>&nbsp;{userScore}</div>
        <div className={styles.goldIconContainer}>
          <Image src={require("../../assets/sprites/gold.png")} width={30} height={30} className={styles.healthIcon} alt="Gold"></Image>
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
