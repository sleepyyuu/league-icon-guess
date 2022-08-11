import Image from "next/image";
import uniqid from "uniqid";
import styles from "../../styles/GuessOptions.module.scss";
import { useEffect, useState } from "react";

export default function GuessOptions(props) {
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
                imageSource = "http://ddragon.leagueoflegends.com/cdn/12.14.1/img/spell/" + ability.image.full;
              } else {
                imageSource = "http://ddragon.leagueoflegends.com/cdn/12.14.1/img/passive/" + ability.image.full;
              }
              let classNameHolder = styles.abilityImage;
              if (selectedChampionAbility.name === ability.name && getAnswer) {
                classNameHolder = styles.abilityImage + " " + styles.abilityAnswerAnimate;
              } else if (currentGuessRow[0].name === ability.name && getAnswer) {
                classNameHolder = styles.abilityImage + " " + styles.abilityChosenAnimate;
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
                <div key={imageSource} className={styles.abilityImageContainer}>
                  <img
                    src={imageSource}
                    width={110}
                    height={110}
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
}
