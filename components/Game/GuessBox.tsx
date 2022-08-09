import { useState } from "react";
import styles from "../../styles/GuessBox.module.scss";
import uniqid from "uniqid";
import Image from "next/image";

export default function GuessBox(props) {
  let { abilityOptions, setAbilityOptions, currentGuessRow, setCurrentGuessRow, results } = props;

  return <div className={styles.guessBoxContainer}></div>;
}
