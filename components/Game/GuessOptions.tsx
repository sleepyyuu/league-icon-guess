import uniqid from "uniqid";
import styles from "../../styles/GuessOptions.module.scss";
import { isMobile } from "react-device-detect";
import { memo } from "react";

const GuessOptions = (props) => {
  let {
    abilityOptions,
    setAbilityOptions,
    currentGuessRow,
    setCurrentGuessRow,
    checkAnswer,
    selectedChampionAbility,
    getAnswer,
    userLife,
    animationEnd,
    gameCount,
    firstFadeAnimation,
    setFirstFadeAnimation,
    fifteenOptions,
  } = props;

  const handleImageClick = (ability, abilityRowIndex, abilityIndex) => {
    if (getAnswer || userLife === 0) {
      return;
    } else {
      checkAnswer(ability);
      setCurrentGuessRow([ability]);
      setFirstFadeAnimation(false);
    }
  };

  return (
    <div className={styles.guessOptionContainer}>
      {abilityOptions.map((abilityRow, abilityRowIndex) => {
        return (
          <div key={uniqid()} className={styles.abilityRow}>
            {abilityRow.map((ability, abilityIndex) => {
              let imageSource = "";
              if (ability.id) {
                imageSource = "https://ddragon.leagueoflegends.com/cdn/12.14.1/img/spell/" + ability.image.full;
              } else {
                imageSource = "https://ddragon.leagueoflegends.com/cdn/12.14.1/img/passive/" + ability.image.full;
              }
              let classNameHolder = styles.abilityImage;
              if (selectedChampionAbility.name === ability.name && getAnswer) {
                classNameHolder = styles.abilityImage + " " + styles.abilityAnswerAnimate;
                if (currentGuessRow[0].name === selectedChampionAbility.name) {
                  classNameHolder += " " + styles.abilityRightBounceAnimation;
                }
              } else if (currentGuessRow[0].name === ability.name && getAnswer) {
                classNameHolder = styles.abilityImage + " " + styles.abilityChosenAnimate;
                classNameHolder += " " + styles.abilityWrongBounceAnimation;
              }
              if (animationEnd && selectedChampionAbility.name === ability.name) {
                classNameHolder = styles.abilityImage + " " + styles.abilityAnswerEnd;
              } else if (animationEnd && currentGuessRow[0].name === ability.name) {
                classNameHolder = styles.abilityImage + " " + styles.abilityChosenEnd;
              }
              if (firstFadeAnimation) {
                classNameHolder += " " + styles.abilityImageAnimateFade;
              }
              return (
                <div
                  key={imageSource}
                  className={styles.abilityImageContainer}
                  style={{
                    height: fifteenOptions && isMobile ? 80 : 100,
                    width: fifteenOptions && isMobile ? 80 : 100,
                    margin: fifteenOptions && isMobile ? "6px" : "10px",
                  }}
                >
                  <img
                    src={imageSource}
                    width={fifteenOptions && isMobile ? 80 : 100}
                    height={fifteenOptions && isMobile ? 80 : 100}
                    onClick={() => {
                      handleImageClick(ability, abilityRowIndex, abilityIndex);
                    }}
                    className={classNameHolder}
                    key={imageSource}
                  ></img>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default memo(GuessOptions);
