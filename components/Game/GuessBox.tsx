import { useState } from "react";
import styles from "../../styles/GuessBox.module.scss";
import uniqid from "uniqid";
import Image from "next/image";

export default function GuessBox(props) {
  let { abilityOptions, setAbilityOptions, currentGuessRow, setCurrentGuessRow } = props;
  let paddedCurrentGuessRow = [...currentGuessRow];
  while (paddedCurrentGuessRow.length < 5) {
    paddedCurrentGuessRow.push({});
  }

  const handleSelectionRemove = (guessAbilityIndex) => {
    let currentAbilityObject = currentGuessRow[guessAbilityIndex];
    let currentGuessRowCopy = [...currentGuessRow];
    currentGuessRowCopy[guessAbilityIndex] = {};
    setCurrentGuessRow(currentGuessRowCopy);

    currentAbilityObject.selected = false;
    let abilityOptionsCopy = [...abilityOptions];
    abilityOptionsCopy[currentAbilityObject.rowIndex][currentAbilityObject.columnIndex] = currentAbilityObject;
    setAbilityOptions(abilityOptionsCopy);
  };

  return (
    <div className={styles.guessBoxContainer}>
      {paddedCurrentGuessRow.map((guessAbility, guessAbilityIndex) => {
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
