import { useEffect, useState } from "react";
export default function GameTimer(props) {
  const { userLife, timeScoreChange, setUserLife, timerReset, setFirstFadeAnimation } = props;
  const [gameTimer, setGameTimer] = useState(userLife);
  const [intervalIdentifier, setIntervalIdentifier] = useState(null);

  useEffect(() => {
    setGameTimer(userLife);
    let intervalID = setInterval(() => {
      setGameTimer((gameTimer) => {
        if (gameTimer - 1 === 0) {
          clearInterval(intervalIdentifier);
        }
        return gameTimer - 1;
      });
    }, 1000);
    setIntervalIdentifier(intervalID);

    return () => {
      return clearInterval(intervalID);
    };
  }, [timerReset]);

  useEffect(() => {
    if (gameTimer + timeScoreChange < 0) {
      setUserLife(0);
      setGameTimer(0);
    } else {
      setGameTimer(gameTimer + timeScoreChange);
    }
  }, [timeScoreChange]);

  useEffect(() => {
    if (gameTimer === 0) {
      clearInterval(intervalIdentifier);
      setUserLife(0);
      setFirstFadeAnimation(false);
    }
  }, [gameTimer]);
  return <div>{gameTimer}</div>;
}
