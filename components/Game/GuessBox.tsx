import { useState } from "react";
import styles from "../../styles/GuessBox.module.scss";
import uniqid from "uniqid";
import Image from "next/image";

export default function GuessBox(props) {
  let { abilityOptions, setAbilityOptions, currentGuessRow, setCurrentGuessRow, results } = props;

  const handleSelectionRemove = (guessAbilityIndex) => {
    if (results) {
      return;
    }
    let currentAbilityObject = currentGuessRow[guessAbilityIndex];

    setCurrentGuessRow([{ name: "" }]);

    currentAbilityObject.selected = false;
    let abilityOptionsCopy = [...abilityOptions];
    abilityOptionsCopy[currentAbilityObject.rowIndex][currentAbilityObject.columnIndex] = currentAbilityObject;
    setAbilityOptions(abilityOptionsCopy);
  };

  return (
    <div className={styles.guessBoxContainer}>
      {currentGuessRow.map((guessAbility, guessAbilityIndex) => {
        if (guessAbility.name) {
          let imageSource = "";
          if (guessAbility.id) {
            imageSource = "http://ddragon.leagueoflegends.com/cdn/12.14.1/img/spell/" + guessAbility.image.full;
          } else {
            imageSource = "http://ddragon.leagueoflegends.com/cdn/12.14.1/img/passive/" + guessAbility.image.full;
          }
          return (
            <div key={uniqid()} className={styles.guessBox + " " + styles.abilityImageContainer}>
              <Image
                src={imageSource}
                width={100}
                height={100}
                onClick={() => {
                  handleSelectionRemove(guessAbilityIndex);
                }}
              ></Image>
            </div>
          );
        } else {
          return (
            <div className={styles.guessBox} key={uniqid()}>
              {}
            </div>
          );
        }
      })}
    </div>
  );
}
