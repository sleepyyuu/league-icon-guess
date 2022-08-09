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
          return (
            <div key={uniqid()} className={styles.guessBox}>
              <Image
                src={"/images/spell/" + guessAbility.image.full}
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
