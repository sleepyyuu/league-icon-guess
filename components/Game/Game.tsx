import GuessOptions from "./GuessOptions";
import GameScoreBoard from "./GameScoreBoard";
import championListData from "../../assets/data/champion.json";
import styles from "../../styles/Game.module.scss";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { isMobile } from "react-device-detect";

//useEffect check if life === 0. popup with newgame option, dependency array life

export default function Game() {
  const [selectedChampionAbility, setSelectedChampionAbility] = useState({ name: "" });
  const [abilityOptions, setAbilityOptions] = useState([]);
  const [currentGuessRow, setCurrentGuessRow] = useState([{ name: "", image: { full: "" }, isPassive: false }]);
  const [gameCount, setGameCount] = useState(0);
  const [userLife, setUserLife] = useState(3);
  const [userScore, setUserScore] = useState(0);
  const [getAnswer, setGetAnswer] = useState(false);
  const [results, setResults] = useState(false);
  const [showInitialMenu, setShowInitialMenu] = useState(false);
  const [showEndMenu, setShowEndMenu] = useState(false);

  const championArray = Object.keys(championListData.data);

  const checkAnswer = (currentGuess) => {
    setGetAnswer(true);
    if (selectedChampionAbility.name === currentGuess.name) {
      setResults(true);
      setUserScore(userScore + 1);
    } else {
      setResults(false);
      setCurrentGuessRow([{ name: "", image: { full: "" }, isPassive: false }]);
      setUserLife(userLife - 1);
      if (userLife - 1 === 0) {
        setShowEndMenu(true);
      }
    }
  };

  const handleNewGame = () => {
    setGameCount(0);
    setUserLife(3);
    setUserScore(0);
    setShowEndMenu(false);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    let abilityAmount = 0;
    if (isMobile) {
      //mobilescreen, handle
      abilityAmount = 4;
    } else {
      abilityAmount = 7;
    }
    setGetAnswer(false);
    setCurrentGuessRow([{ name: "", image: { full: "" }, isPassive: false }]);
    const answerChampionNumber = Math.floor(Math.random() * championArray.length);
    let selectedChamp = require("../../assets/data/champion/" + championArray[answerChampionNumber] + ".json").data;
    selectedChamp = selectedChamp[Object.keys(selectedChamp)[0]];

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
    while (additionalAbilityChoices.length < abilityAmount) {
      let randomChampionNumber = Math.floor(Math.random() * championArray.length);
      let additionalSelectedChamp = require("../../assets/data/champion/" + championArray[randomChampionNumber] + ".json").data;
      additionalSelectedChamp = additionalSelectedChamp[Object.keys(additionalSelectedChamp)[0]];
      let randomAbilitySelect = Math.floor(Math.random() * 4);
      if (additionalSelectedChamp.spells[randomAbilitySelect].name === selectedAbility.name) {
        continue;
      }
      if (additionalAbilityChoices.find((ability) => ability.name === additionalSelectedChamp.spells[randomAbilitySelect].name)) {
        continue;
      } else {
        additionalAbilityChoices.push(additionalSelectedChamp.spells[randomAbilitySelect]);
      }
    }
    let additionalPassiveChoices = [];
    while (additionalPassiveChoices.length < abilityAmount) {
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
    shuffleArray(abilityOptionsArray);
    if (isMobile) {
      setAbilityOptions([abilityOptionsArray.slice(0, 3), abilityOptionsArray.slice(3, 6), abilityOptionsArray.slice(6, 9)]);
    } else {
      setAbilityOptions([abilityOptionsArray.slice(0, 5), abilityOptionsArray.slice(5, 10), abilityOptionsArray.slice(10, 15)]);
    }
  }, [gameCount]);

  useEffect(() => {
    setShowInitialMenu(true);
  }, []);

  return (
    <div>
      <Popup
        overlayStyle={{ background: "rgba(0,0,0,0.55)" }}
        contentStyle={{
          backgroundColor: "rgb(24, 24, 24)",
          border: "none",
          borderRadius: "7px",
          width: isMobile ? "85%" : "33rem",
          maxWidth: "33rem",
          height: isMobile ? "32rem" : "45rem",
          padding: "0px",
        }}
        modal
        open={showInitialMenu}
        closeOnDocumentClick
        onClose={() => {
          setShowInitialMenu(false);
        }}
      >
        <div className={styles.modal}>
          <button
            className={styles.modalClose}
            onClick={() => {
              setShowInitialMenu(false);
            }}
          >
            &times;
          </button>
          <div className={styles.modalHeader}>How To Play</div>
          <div className={styles.modalContent}>
            <div>Click on the icon that matches the name</div>
            <div>Aim for a high streak within 3 lives.</div>
            <div>One shot only for each question</div>
            <div>
              Examples
              <div>Blinding dart</div>
              <div>90 Caliber net</div>
            </div>
          </div>
        </div>
      </Popup>
      <Popup
        overlayStyle={{ background: "rgba(0,0,0,0.55)" }}
        contentStyle={{
          backgroundColor: "rgb(24, 24, 24)",
          border: "none",
          borderRadius: "7px",
          maxWidth: "36rem",
          height: isMobile ? "32rem" : "45rem",
          padding: "0px",
        }}
        modal
        open={showEndMenu}
        closeOnDocumentClick
        onClose={() => {
          setShowEndMenu(false);
        }}
      >
        <div className={styles.modal}>
          <button
            className={styles.modalClose}
            onClick={() => {
              setShowEndMenu(false);
            }}
          >
            &times;
          </button>
          <div className={styles.modalHeader}>Your Stats</div>
          <div className={styles.modalContent}>
            <div>played</div>
            <div>Highest streak</div>
            <div>idk</div>
            <div>
              Examples
              <div>Blinding dart</div>
              <div>90 Caliber net</div>
            </div>
            <button
              onClick={() => {
                handleNewGame();
              }}
            >
              Play again
            </button>
          </div>
        </div>
      </Popup>
      <GameScoreBoard userLife={userLife} userScore={userScore}></GameScoreBoard>
      <div className={styles.gameFooter}>
        <div className={styles.question}>
          Which of these is <div className={styles.abilityName}>{selectedChampionAbility ? selectedChampionAbility.name + "?" : ""}</div>
        </div>
      </div>
      {/*<div className={styles.answerCheckContainer}>{getAnswer ? results ? <div>correct!</div> : <div>try again</div> : null} </div>*/}
      <GuessOptions
        abilityOptions={abilityOptions}
        setAbilityOptions={setAbilityOptions}
        currentGuessRow={currentGuessRow}
        setCurrentGuessRow={setCurrentGuessRow}
        checkAnswer={checkAnswer}
        selectedChampionAbility={selectedChampionAbility}
        getAnswer={getAnswer}
        userLife={userLife}
      ></GuessOptions>
      <div className={styles.gameFooter}>
        <button
          className={styles.newGameButton}
          onClick={() => {
            if (userLife === 0) {
              return;
            }
            setGameCount(gameCount + 1);
          }}
        >
          next round
        </button>
      </div>
      {userLife === 0 ? (
        <div>
          <button
            onClick={() => {
              setShowEndMenu(true);
            }}
          >
            result screen
          </button>
        </div>
      ) : null}
    </div>
  );
}
