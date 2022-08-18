import { FaQuestionCircle } from "react-icons/fa";
import styles from "../../styles/FastToggle.module.scss";
import { useState, useEffect } from "react";

export default function FastToggle(props) {
  const { isFastMode, setisFastMode, getAnswer, gameCount, setGameCount, setFirstFadeAnimation, userLife } = props;
  const [showFastDetail, setShowFastDetail] = useState(false);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      return setShowFastDetail(false);
    }, 4000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showFastDetail]);
  return (
    <div className={styles.toggleQuickContainer}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isFastMode}
          onChange={() => {
            setisFastMode(!isFastMode);
            setFirstFadeAnimation(false);
            if (getAnswer && userLife !== 0) {
              setGameCount(gameCount + 1);
            }
          }}
        ></input>
        <span className={styles.slider + " " + styles.round}></span>
      </label>
      <div className={styles.toggleDescription}>
        FAST MODE &nbsp;
        <div className={styles.autoStartIconContainer}>
          {showFastDetail ? (
            <div className={styles.autoStartDetailContainer}>
              Automatically progresses to<br></br> the next round when enabled.
            </div>
          ) : null}
          <FaQuestionCircle
            className={styles.questionIcon}
            size={20}
            onClick={() => {
              setShowFastDetail(true);
            }}
          ></FaQuestionCircle>
        </div>
      </div>
    </div>
  );
}
