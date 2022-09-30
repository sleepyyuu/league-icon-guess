import styles from "../../styles/GameScoreBoard.module.scss";
import Image from "next/image";
import GameTimer from "./GameTimer";

export default function GameScoreBoard(props) {
  const { userScore, userLife, results, timedAttack, timeScoreChange, setUserLife, timerReset, setFirstFadeAnimation } = props;
  let lifeIconArray = [];
  if (timedAttack) {
  } else {
    for (let i = 3; i > 0; i--) {
      lifeIconArray.push(
        <Image
          src={require("../../public/sprites/healthicon.png")}
          width={30}
          height={30}
          className={userLife - i >= 0 ? styles.healthIcon : styles.healthIconNoShow}
          alt="Life"
        ></Image>
      );
    }
  }
  return (
    <div className={styles.scoreBoardContainer}>
      <div className={styles.scoreContainer}>
        SCORE
        <div className={styles.scoreNumber}>
          <div className={results ? styles.addScoreAnimation : styles.addScoreAnimationHide}>+1</div>&nbsp;&nbsp;{userScore}
        </div>
        <div className={styles.goldIconContainer}>
          <Image src={require("../../public/sprites/gold.png")} width={30} height={30} className={styles.goldIcon} alt="Gold"></Image>
        </div>
      </div>
      {timedAttack ? (
        <div className={styles.lifeContainer}>
          <div className={styles.timedWord}>Time&nbsp;</div>
          {
            <GameTimer
              userLife={userLife}
              timeScoreChange={timeScoreChange}
              setUserLife={setUserLife}
              timerReset={timerReset}
              setFirstFadeAnimation={setFirstFadeAnimation}
            ></GameTimer>
          }
        </div>
      ) : (
        <div className={styles.lifeContainer}>
          {lifeIconArray.map((icon, index) => {
            return <div key={index}>{icon}</div>;
          })}
          <div className={styles.livesWord}>&nbsp;LIVES</div>
        </div>
      )}
    </div>
  );
}
