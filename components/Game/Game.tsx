import GuessOptions from "./GuessOptions";
import GameScoreBoard from "./GameScoreBoard";
import GameFooter from "./GameFooter";
import championListData from "../../assets/data/champion.json";
import GameResult from "./GameResult";
import styles from "../../styles/Game.module.scss";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { isMobile } from "react-device-detect";
import uniqid from "uniqid";
import { logEvent, getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

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
  const [showButtons, setShowButtons] = useState(false);
  const [showInitialMenu, setShowInitialMenu] = useState(false);
  const [showEndMenu, setShowEndMenu] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const [firstFadeAnimation, setFirstFadeAnimation] = useState(false);
  const [highestStreak, setHighestStreak] = useState(0);
  const [numGamesPlayed, setNumGamesPlayed] = useState(0);

  const championArray = Object.keys(championListData.data);
  const exampleAbilities = [
    <img
      src={"https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/CaitlynW.png"}
      width={100}
      height={100}
      className={styles.exampleImage + " " + styles.exampleCorrect}
      alt="Yordle Snap Trap"
      key={uniqid()}
    ></img>,
    <img
      src={"https://ddragon.leagueoflegends.com/cdn/12.15.1/img/spell/BlindingDart.png"}
      width={100}
      height={100}
      className={styles.exampleImage + " " + styles.exampleIncorrect}
      alt="Blind Dart"
      key={uniqid()}
    ></img>,
  ];
  const checkAnswer = (currentGuess) => {
    let abilityName = "" + [selectedChampionAbility.name][0];
    //let answerAnalytics = { skillName: abilityName };
    setGetAnswer(true);
    const analytics = getAnalytics();
    if (selectedChampionAbility.name === currentGuess.name) {
      logEvent(analytics, "user_answer_correct", { skillNameCorrect: abilityName });
      setResults(true);
      setUserScore(userScore + 1);
    } else {
      logEvent(analytics, "user_answer_incorrect", { skillNameIncorrect: abilityName });
      setResults(false);
      setCurrentGuessRow([{ name: "", image: { full: "" }, isPassive: false }]);
      setUserLife(userLife - 1);
    }
  };

  const handleNewGame = () => {
    setGameCount(0);
    setUserLife(3);
    setUserScore(0);
    setShowEndMenu(false);
    pullFromLocalStorage();
  };

  const pullFromLocalStorage = () => {
    let storedGamesPlayed = localStorage.getItem("numPlayed");
    let storedHighestStreak = localStorage.getItem("highestStreak");
    if (storedGamesPlayed) {
      setNumGamesPlayed(parseInt(storedGamesPlayed, 10));
    }
    if (storedHighestStreak) {
      setHighestStreak(parseInt(storedHighestStreak, 10));
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    setResults(false);
    setAnimationEnd(false);
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

    if (userLife !== 3 || userScore !== 0) {
      setFirstFadeAnimation(true);
    }
  }, [gameCount]);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyByPoeWhQtqjn1gZ_Bobg9uHPHoq5UfcYk",
      authDomain: "league-skill-issue.firebaseapp.com",
      projectId: "league-skill-issue",
      storageBucket: "league-skill-issue.appspot.com",
      messagingSenderId: "205982962159",
      appId: "1:205982962159:web:dc37af54a61e4129d7a61a",
      measurementId: "G-XNM7NS09ZS",
    };
    initializeApp(firebaseConfig);
    setShowInitialMenu(true);
    pullFromLocalStorage();
    setShowButtons(true);
  }, []);

  useEffect(() => {
    if (userLife === 0) {
      const analytics = getAnalytics();
      logEvent(analytics, "level_end", { success: true });
      logEvent(analytics, "post_score", { score: userScore });
      setNumGamesPlayed(numGamesPlayed + 1);
      setTimeout(() => {
        setShowEndMenu(true);
        setAnimationEnd(true);
      }, 1000);
    }
  }, [userLife]);

  useEffect(() => {
    if (userScore > highestStreak) {
      localStorage.setItem("highestStreak", "" + userScore);
      setHighestStreak(userScore);
    }
    localStorage.setItem("numPlayed", "" + numGamesPlayed);
  }, [numGamesPlayed]);

  return (
    <div>
      <Popup
        overlayStyle={{ background: "rgba(0,0,0,0.55)" }}
        contentStyle={{
          backgroundColor: "rgb(24, 24, 24)",
          border: "none",
          borderRadius: "7px",
          width: isMobile ? "95vw" : "33rem",
          maxWidth: "33rem",
          height: isMobile ? "" : "45rem",
          padding: "0px",
          animation: "anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards",
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
          <div className={styles.modalHeader}>INFO</div>
          <div className={styles.modalContent}>
            <div className={styles.infoContainer}>
              <div>Aim for a high streak within 3 lives.</div>
              <div>Click on the icon that matches the name.</div>
              <div>One guess only for each question.</div>
              <div>Includes both abilities AND passives.</div>
            </div>
            <div className={styles.exampleContainer}>
              <div>EXAMPLE</div>
              <div className={styles.exampleName}>
                <div style={{ fontWeight: "700", fontFamily: "Roboto" }}>Yordle Snap Trap</div>
              </div>
              <div className={styles.exampleRow}>
                <div className={styles.exampleColumn}>
                  <div>Correct Selection</div> <div>{exampleAbilities[0]}</div>
                </div>
                <div className={styles.exampleColumn}>
                  <div>Incorrect Selection</div> <div>{exampleAbilities[1]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.playButtonContainer}>
            <div className={styles.playButtonShadow}></div>
            <button
              className={styles.playButton}
              onClick={() => {
                setShowInitialMenu(false);
              }}
            >
              Start!
            </button>
          </div>
        </div>
      </Popup>
      <Popup
        overlayStyle={{ background: "rgba(0,0,0,0.55)" }}
        contentStyle={{
          backgroundColor: "rgb(24, 24, 24)",
          border: "none",
          borderRadius: "7px",
          width: isMobile ? "95vw" : "33rem",
          maxWidth: "33rem",
          height: isMobile ? "" : "45rem",
          padding: "0px",
          animation: "anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards",
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
          <div className={styles.modalHeader}>
            <div className={styles.statsHeader}>STATS</div>
          </div>
          <div className={styles.modalContent}>
            <GameResult
              userScore={userScore}
              handleNewGame={handleNewGame}
              highestStreak={highestStreak}
              numGamesPlayed={numGamesPlayed}
            ></GameResult>
          </div>
        </div>
      </Popup>
      {showButtons ? <GameScoreBoard userLife={userLife} userScore={userScore} results={results}></GameScoreBoard> : null}
      {showButtons ? (
        <div className={styles.gameFooter}>
          <div className={styles.question}>
            Which of these is{" "}
            <div className={styles.abilityName}>{selectedChampionAbility ? selectedChampionAbility.name.toUpperCase() + "?" : ""}</div>
          </div>
        </div>
      ) : null}
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
        animationEnd={animationEnd}
        results={results}
        firstFadeAnimation={firstFadeAnimation}
        setFirstFadeAnimation={setFirstFadeAnimation}
      ></GuessOptions>
      <GameFooter
        setShowInitialMenu={setShowInitialMenu}
        userLife={userLife}
        getAnswer={getAnswer}
        gameCount={gameCount}
        setGameCount={setGameCount}
        setShowEndMenu={setShowEndMenu}
        showButtons={showButtons}
      ></GameFooter>
    </div>
  );
}
