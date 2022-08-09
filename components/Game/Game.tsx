import GuessBox from "./GuessBox";
import GuessOptions from "./GuessOptions";
import championListData from "../../assets/data/champion.json";
import { useEffect, useState } from "react";

export default function Game() {
  const [selectedChampion, setSelectedChampion] = useState({ name: "" });
  const [selectedChampionAbilities, setSelectedChampionAbilities] = useState([]);
  const [abilityOptions, setAbilityOptions] = useState([]);
  const [currentGuessRow, setCurrentGuessRow] = useState([{ name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }]);
  const [guessNumber, setGuessNumber] = useState(0);
  const [getAnswer, setGetAnswer] = useState(false);
  const [results, setResults] = useState("");

  const checkAnswer = () => {
    setGetAnswer(true);
    for (let i = 0; i < 5; i++) {
      if (selectedChampionAbilities[i].name !== currentGuessRow[i].name) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const championArray = Object.keys(championListData.data);
    const answerChampionNumber = Math.floor(Math.random() * championArray.length);
    let selectedChamp = require("../../assets/data/champion/" + championArray[answerChampionNumber] + ".json").data;
    selectedChamp = selectedChamp[Object.keys(selectedChamp)[0]];
    setSelectedChampion(selectedChamp);
    setSelectedChampionAbilities([selectedChamp.passive, ...selectedChamp.spells]);
    let additionalAbilityChoices = [];
    while (additionalAbilityChoices.length < 8) {
      let randomChampionNumber = Math.floor(Math.random() * championArray.length);
      if (randomChampionNumber === answerChampionNumber) {
        continue;
      } else {
        let additionalSelectedChamp = require("../../assets/data/champion/" + championArray[randomChampionNumber] + ".json").data;
        additionalSelectedChamp = additionalSelectedChamp[Object.keys(additionalSelectedChamp)[0]];
        let randomAbilitySelect = Math.floor(Math.random() * 4);
        if (additionalAbilityChoices.find((ability) => ability.name === additionalSelectedChamp.spells[randomAbilitySelect].name)) {
          continue;
        } else {
          additionalAbilityChoices.push(additionalSelectedChamp.spells[randomAbilitySelect]);
        }
      }
    }
    let additionalPassiveChoices = [];
    while (additionalPassiveChoices.length < 2) {
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
    let abilityOptionsArray = [...selectedChamp.spells, ...additionalAbilityChoices, selectedChamp.passive, ...additionalPassiveChoices];
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
      <div>Selected champion is {selectedChampion ? selectedChampion.name : ""}</div>
      <GuessBox
        abilityOptions={abilityOptions}
        setAbilityOptions={setAbilityOptions}
        currentGuessRow={currentGuessRow}
        setCurrentGuessRow={setCurrentGuessRow}
      ></GuessBox>
      {getAnswer ? <div>verdict is {results}</div> : null}
      <button
        onClick={() => {
          if (checkAnswer()) {
            setResults("Correct!");
          } else {
            setResults("Wrong!");
          }
        }}
      >
        check answer
      </button>
      <GuessOptions
        abilityOptions={abilityOptions}
        setAbilityOptions={setAbilityOptions}
        currentGuessRow={currentGuessRow}
        setCurrentGuessRow={setCurrentGuessRow}
      ></GuessOptions>
    </div>
  );
}
