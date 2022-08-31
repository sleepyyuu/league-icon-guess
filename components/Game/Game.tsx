import GuessOptions from "./GuessOptions";
import GameScoreBoard from "./GameScoreBoard";
import GameFooter from "./GameFooter";
import LangSelect from "./LangSelect";
import championListData from "../../assets/en_US/champion.json";
import GameResult from "./GameResult";
import FastToggle from "./FastToggle";
import styles from "../../styles/Game.module.scss";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { isMobile } from "react-device-detect";
import uniqid from "uniqid";
import { logEvent, getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";
import confetti from "canvas-confetti";

export default function Game(props) {
  const { championObject, lang } = props;
  const { asPath } = useRouter();
  let locale = asPath.split("/")[2];
  if (!locale) {
    locale = "en_US";
  }
  const [fifteenOptions, setFifteenOptions] = useState(false);
  const [selectedChampionAbility, setSelectedChampionAbility] = useState({ name: "" });
  const [abilityOptions, setAbilityOptions] = useState([]);
  const [currentGuessRow, setCurrentGuessRow] = useState([{ name: "", image: { full: "" }, isPassive: false }]);
  const [gameCount, setGameCount] = useState(0);
  const [userCurrentGuessName, setUserCurrentGuessName] = useState("");
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
  const [highestStreakVeteran, setHighestStreakVeteran] = useState(0);
  const [numGamesPlayedVeteran, setNumGamesPlayedVeteran] = useState(0);
  const [isFastMode, setisFastMode] = useState(false);
  const [questionAbilityOrder, setQuestionAbilityOrder] = useState([]);
  const [questionAbilityCurrent, setQuestionAbilityCurrent] = useState(0);
  const [perfectScore, setPerfectScore] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
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
      if (gameCount + 1 === championArray.length * 5) {
        if (userScore + 1 === championArray.length * 5) {
          setPerfectScore(true);
          setTimeout(() => {
            setShowEndMenu(true);
            setAnimationEnd(true);
            confetti({
              spread: 70,
              particleCount: 150,
              startVelocity: 35,
            });
          }, 1000);
        }
        setGameEnd(true);
      } else {
        if (isFastMode && userLife !== 0) {
          setTimeout(() => {
            setGameCount(gameCount + 1);
          }, 10);
        }
      }
    } else {
      setUserCurrentGuessName(currentGuess.name + "(" + currentGuess.championName + ")");
      logEvent(analytics, "user_answer_incorrect", { skillNameIncorrect: abilityName });
      setResults(false);
      setCurrentGuessRow([{ name: "", image: { full: "" }, isPassive: false }]);
      setUserLife(userLife - 1);
      if (isFastMode && userLife - 1 !== 0) {
        setTimeout(() => {
          setGameCount(gameCount + 1);
        }, 1100);
      }
    }
    setQuestionAbilityCurrent(() => {
      return questionAbilityCurrent + 1;
    });
  };

  const handleNewGame = (difficultSelection) => {
    setPerfectScore(false);
    setFifteenOptions(difficultSelection);
    setQuestionAbilityCurrent(0);
    setGameCount(0);
    setUserLife(3);
    setUserScore(0);
    setShowEndMenu(false);
    pullFromLocalStorage();
  };

  const pullFromLocalStorage = () => {
    let storedGamesPlayed = localStorage.getItem("numPlayed");
    let storedHighestStreak = localStorage.getItem("highestStreak");
    let storedGamesPlayedVeteran = localStorage.getItem("numPlayedVeteran");
    let storedHighestStreakVeteran = localStorage.getItem("highestStreakVeteran");
    if (storedGamesPlayed) {
      setNumGamesPlayed(parseInt(storedGamesPlayed, 10));
    }
    if (storedHighestStreak) {
      setHighestStreak(parseInt(storedHighestStreak, 10));
    }
    if (storedGamesPlayedVeteran) {
      setNumGamesPlayedVeteran(parseInt(storedGamesPlayedVeteran, 10));
    }
    if (storedHighestStreakVeteran) {
      setHighestStreakVeteran(parseInt(storedHighestStreakVeteran, 10));
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const setupQuestionList = () => {
    let questionArrayList = Array.from(Array(Object.keys(championObject).length * 5).keys());
    shuffleArray(questionArrayList);
    setQuestionAbilityOrder(questionArrayList);
    return questionArrayList;
  };

  const setupAbilitySelection = (veteran, questionArrayListValues) => {
    setGetAnswer(false);
    setCurrentGuessRow([{ name: "", image: { full: "" }, isPassive: false }]);
    const answerChampionNumber = Math.floor(questionArrayListValues[questionAbilityCurrent] / 5);
    let selectedChamp = championObject[championArray[answerChampionNumber]];
    let selectedChampName = championArray[answerChampionNumber];
    selectedChamp = selectedChamp[selectedChampName];
    let selectedAbility = { name: "", isPassive: false };
    if (questionArrayListValues[questionAbilityCurrent] % 5 === 4) {
      selectedAbility = { ...selectedChamp.passive };
      selectedAbility.isPassive = true;
    } else {
      let tempAbility = selectedChamp.spells[questionAbilityCurrent % 4];
      selectedAbility = { ...tempAbility };
      selectedAbility.isPassive = false;
    }
    if (!selectedAbility.name) {
      selectedAbility.name = "";
    }
    setSelectedChampionAbility(selectedAbility);
    let additionalAbilityChoices = [];
    let abilityAmountCap = veteran ? 9 : 5;
    while (additionalAbilityChoices.length < abilityAmountCap) {
      let randomChampionNumber = Math.floor(Math.random() * championArray.length);
      let additionalSelectedChamp = championObject[championArray[randomChampionNumber]];
      additionalSelectedChamp = additionalSelectedChamp[championArray[randomChampionNumber]];
      let randomAbilitySelect = Math.floor(Math.random() * 4);
      if (additionalSelectedChamp.spells[randomAbilitySelect].name === selectedAbility.name) {
        continue;
      }
      if (additionalAbilityChoices.find((ability) => ability.name === additionalSelectedChamp.spells[randomAbilitySelect].name)) {
        continue;
      } else {
        let temp = additionalSelectedChamp.spells[randomAbilitySelect];
        temp.championName = additionalSelectedChamp.name;
        additionalAbilityChoices.push(temp);
      }
    }
    let additionalPassiveChoices = [];
    let passiveAmountCap = veteran ? 6 : 3;
    while (additionalPassiveChoices.length < passiveAmountCap) {
      let randomChampionNumber = Math.floor(Math.random() * championArray.length);
      if (randomChampionNumber === answerChampionNumber) {
        continue;
      } else {
        let additionalSelectedChamp = championObject[championArray[randomChampionNumber]];
        additionalSelectedChamp = additionalSelectedChamp[championArray[randomChampionNumber]];
        if (additionalPassiveChoices.find((passive) => passive.name === additionalSelectedChamp.passive.name)) {
          continue;
        } else {
          let temp = additionalSelectedChamp.passive;
          temp.championName = additionalSelectedChamp.name;
          additionalPassiveChoices.push(temp);
        }
      }
    }
    let abilityOptionsArray = [...additionalAbilityChoices, selectedAbility, ...additionalPassiveChoices];
    shuffleArray(abilityOptionsArray);
    if (!veteran) {
      setAbilityOptions([abilityOptionsArray.slice(0, 3), abilityOptionsArray.slice(3, 6), abilityOptionsArray.slice(6, 9)]);
    } else {
      setAbilityOptions([
        abilityOptionsArray.slice(0, 4),
        abilityOptionsArray.slice(4, 8),
        abilityOptionsArray.slice(8, 12),
        abilityOptionsArray.slice(12, 16),
      ]);
    }
  };

  useEffect(() => {
    setResults(false);
    setAnimationEnd(false);
    setUserCurrentGuessName("");
    if (gameCount === 0) {
      setupAbilitySelection(fifteenOptions, setupQuestionList());
    } else {
      setupAbilitySelection(fifteenOptions, questionAbilityOrder);
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
    const app = initializeApp(firebaseConfig);
    setShowInitialMenu(true);
    pullFromLocalStorage();
    setShowButtons(true);
  }, []);

  useEffect(() => {
    if (userLife === 0) {
      const analytics = getAnalytics();
      logEvent(analytics, "level_end", { success: true });
      logEvent(analytics, "post_score", { score: userScore });
      if (fifteenOptions) {
        setNumGamesPlayedVeteran(numGamesPlayedVeteran + 1);
      } else {
        setNumGamesPlayed(numGamesPlayed + 1);
      }
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

  useEffect(() => {
    if (fifteenOptions) {
      if (userScore > highestStreakVeteran) {
        localStorage.setItem("highestStreakVeteran", "" + userScore);
        setHighestStreakVeteran(userScore);
      }
      localStorage.setItem("numPlayedVeteran", "" + numGamesPlayedVeteran);
    }
  }, [numGamesPlayedVeteran]);

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
              <div>Aim for a high streak in 3 lives.</div>
              <div>Tap the icon that matches the name.</div>
              <div>Novice has 9 choices. Veteran has 16 choices.</div>
            </div>
            <LangSelect locale={locale} lang={lang}></LangSelect>
            <div className={styles.exampleContainer}>
              <div>EXAMPLE</div>
              <div className={styles.exampleName}>
                <div style={{ fontWeight: "700", fontFamily: "Roboto" }}>{championObject["Caitlyn"]["Caitlyn"].spells[1].name}</div>
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
          {userLife === 3 && userScore === 0 ? (
            <div className={styles.difficultyContainer}>
              <div
                className={fifteenOptions ? styles.difficultySelector : styles.difficultySelected}
                onClick={() => {
                  setFifteenOptions(false);
                  setupAbilitySelection(false, setupQuestionList());
                }}
              >
                NOVICE
              </div>
              <div
                className={fifteenOptions ? styles.difficultySelected : styles.difficultySelector}
                onClick={() => {
                  setFifteenOptions(true);
                  setupAbilitySelection(true, setupQuestionList());
                }}
              >
                VETERAN
              </div>
            </div>
          ) : null}
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
              highestStreakVeteran={highestStreakVeteran}
              numGamesPlayedVeteran={numGamesPlayedVeteran}
              fifteenOptions={fifteenOptions}
              perfectScore={perfectScore}
            ></GameResult>
          </div>
        </div>
      </Popup>
      {showButtons ? <GameScoreBoard userLife={userLife} userScore={userScore} results={results}></GameScoreBoard> : null}
      {showButtons ? (
        <div className={styles.gameHeader}>
          {userCurrentGuessName === "" ? null : (
            <div className={styles.incorrectDetailContainer}>
              <div className={styles.incorrectDetail}>
                You guessed&nbsp;
                <div className={styles.incorrectDetailName}>
                  <a
                    href={"https://www.google.com/search?q=league+of+legends+" + userCurrentGuessName}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {userCurrentGuessName}
                  </a>
                </div>
                ...
              </div>
            </div>
          )}
          <div className={styles.question}>
            Which of these is{" "}
            <div className={styles.abilityName}>{selectedChampionAbility ? selectedChampionAbility.name.toUpperCase() + "?" : ""}</div>
          </div>
        </div>
      ) : null}
      <div className={styles.questionProgress}>
        {gameCount + 1} / {championArray.length * 5}
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
        animationEnd={animationEnd}
        results={results}
        firstFadeAnimation={firstFadeAnimation}
        setFirstFadeAnimation={setFirstFadeAnimation}
        fifteenOptions={fifteenOptions}
        userScore={userScore}
      ></GuessOptions>
      <GameFooter
        setShowInitialMenu={setShowInitialMenu}
        userLife={userLife}
        getAnswer={getAnswer}
        gameCount={gameCount}
        setGameCount={setGameCount}
        setShowEndMenu={setShowEndMenu}
        showButtons={showButtons}
        isFastMode={isFastMode}
        gameEnd={gameEnd}
      ></GameFooter>
      <FastToggle
        isFastMode={isFastMode}
        setisFastMode={setisFastMode}
        getAnswer={getAnswer}
        gameCount={gameCount}
        setGameCount={setGameCount}
        setFirstFadeAnimation={setFirstFadeAnimation}
        userLife={userLife}
        gameEnd={gameEnd}
      ></FastToggle>
    </div>
  );
}
