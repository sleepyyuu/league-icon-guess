import GuessBox from "./GuessBox";
import GuessOptions from "./GuessOptions";
import championListData from "../../assets/data/champion.json";
import styles from "../../styles/Game.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import uniqid from "uniqid";

export default function Game() {
  const [selectedChampion, setSelectedChampion] = useState({ name: "" });
  const [selectedChampionAbility, setSelectedChampionAbility] = useState({ name: "" });
  const [abilityOptions, setAbilityOptions] = useState([]);
  const [alreadyGuessed, setAlreadyGuessed] = useState([
    { name: "", image: { full: "" }, isPassive: false },
    { name: "", image: { full: "" }, isPassive: false },
    { name: "", image: { full: "" }, isPassive: false },
    { name: "", image: { full: "" }, isPassive: false },
    { name: "", image: { full: "" }, isPassive: false },
  ]);
  const [currentGuessRow, setCurrentGuessRow] = useState([{ name: "", image: { full: "" }, isPassive: false }]);
  const [guessNumber, setGuessNumber] = useState(0);
  const [getAnswer, setGetAnswer] = useState(false);
  const [results, setResults] = useState(false);

  const checkAnswer = () => {
    setGetAnswer(true);
    if (selectedChampionAbility.name !== currentGuessRow[0].name) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const championArray = Object.keys(championListData.data);
    const answerChampionNumber = Math.floor(Math.random() * championArray.length);
    let selectedChamp = require("../../assets/data/champion/" + championArray[answerChampionNumber] + ".json").data;
    selectedChamp = selectedChamp[Object.keys(selectedChamp)[0]];
    setSelectedChampion(selectedChamp);
    let randomSelect = Math.floor(Math.random() * 5);
    let selectedAbility;
    if (randomSelect > 3) {
      selectedAbility = selectedChamp.passive;
      selectedAbility.isPassive = true;
      setSelectedChampionAbility(selectedAbility);
    } else {
      selectedAbility = selectedChamp.spells[randomSelect];
      selectedAbility.isPassive = false;
      setSelectedChampionAbility(selectedAbility);
    }
    let additionalAbilityChoices = [];
    while (additionalAbilityChoices.length < 8) {
      let randomChampionNumber = Math.floor(Math.random() * championArray.length);
      let additionalSelectedChamp = require("../../assets/data/champion/" + championArray[randomChampionNumber] + ".json").data;
      additionalSelectedChamp = additionalSelectedChamp[Object.keys(additionalSelectedChamp)[0]];
      let randomAbilitySelect = Math.floor(Math.random() * 4);
      if (additionalAbilityChoices.find((ability) => ability.name === additionalSelectedChamp.spells[randomAbilitySelect].name)) {
        continue;
      } else {
        additionalAbilityChoices.push(additionalSelectedChamp.spells[randomAbilitySelect]);
      }
    }
    let additionalPassiveChoices = [];
    while (additionalPassiveChoices.length < 6) {
      let randomChampionNumber = Math.floor(Math.random() * championArray.length);
      if (randomChampionNumber === answerChampionNumber) {
        continue;
      } else {
        let additionalSelectedChamp = require("../../assets/data/champion/" + championArray[randomChampionNumber] + ".json").data;
        additionalSelectedChamp = additionalSelectedChamp[Object.keys(additionalSelectedChamp)[0]];
        if (additionalPassiveChoices.find((passive) => passive.name === additionalSelectedChamp.passive.name)) {
          continue;
        } else {
          additionalPassiveChoices.push(additionalSelectedChamp.passive);
        }
      }
    }
    let abilityOptionsArray = [...additionalAbilityChoices, selectedAbility, ...additionalPassiveChoices];
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
    shuffleArray(abilityOptionsArray);
    setAbilityOptions([abilityOptionsArray.slice(0, 5), abilityOptionsArray.slice(5, 10), abilityOptionsArray.slice(10, 15)]);
  }, []);
  return (
    <div>
      <div className={styles.guessedBoxContainer}>
        {alreadyGuessed.map((guessedAbility) => {
          let imageSource = "";
          if (!guessedAbility.isPassive) {
            imageSource = "http://ddragon.leagueoflegends.com/cdn/12.14.1/img/spell/" + guessedAbility.image.full;
          } else {
            imageSource = "http://ddragon.leagueoflegends.com/cdn/12.14.1/img/passive/" + guessedAbility.image.full;
          }
          return (
            <div key={uniqid()} className={styles.guessedBox + " " + styles.abilityImageContainer}>
              {guessedAbility.image.full === "" ? null : <img src={imageSource} width={100} height={100}></img>}
            </div>
          );
        })}
      </div>
      <div>Which of these is {selectedChampionAbility ? selectedChampionAbility.name : ""}</div>
      <GuessBox
        abilityOptions={abilityOptions}
        setAbilityOptions={setAbilityOptions}
        currentGuessRow={currentGuessRow}
        setCurrentGuessRow={setCurrentGuessRow}
        results={results}
      ></GuessBox>
      <div className={styles.answerCheckContainer}>
        <button
          onClick={() => {
            if (results === false) {
              let found = false;
              let index = 0;
              while (!found) {
                if (alreadyGuessed[index].name === "") {
                  let alreadyGuessedCopy = [...alreadyGuessed];
                  alreadyGuessedCopy[index] = currentGuessRow[0];
                  setAlreadyGuessed(alreadyGuessedCopy);
                  found = true;
                } else {
                  index++;
                }
              }
            }
            if (checkAnswer()) {
              setResults(true);
            } else {
              setCurrentGuessRow([{ name: "", image: { full: "" }, isPassive: false }]);
            }
          }}
        >
          check answer
        </button>
        {getAnswer ? results ? <div>correct!</div> : <div>try again</div> : null}
      </div>

      <GuessOptions
        abilityOptions={abilityOptions}
        setAbilityOptions={setAbilityOptions}
        currentGuessRow={currentGuessRow}
        setCurrentGuessRow={setCurrentGuessRow}
      ></GuessOptions>
    </div>
  );
}
