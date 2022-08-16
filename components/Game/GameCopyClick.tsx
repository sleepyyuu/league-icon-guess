import styles from "../../styles/GameCopyClick.module.scss";
import { FaCopy } from "react-icons/fa";
import { useEffect, useState } from "react";
import { logEvent, getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

export default function GameCopyClick() {
  const [copyText, setCopyText] = useState(false);

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

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      return setCopyText(false);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyText]);

  return (
    <div className={styles.copyUrlContainer}>
      <div className={styles.copyUrl}>https://skill-issue.com</div>
      <div
        className={styles.copyUrlIconContainer}
        onClick={() => {
          navigator.clipboard.writeText("https://skill-issue.com");
          setCopyText(true);
          const analytics = getAnalytics(app);
          logEvent(analytics, "share_link_clicked");
        }}
      >
        <FaCopy className={styles.copyUrlIcon}></FaCopy>
      </div>
      {copyText ? <div className={styles.copiedBox}>URL Copied!</div> : null}
    </div>
  );
}
