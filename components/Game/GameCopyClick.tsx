import styles from "../../styles/GameCopyClick.module.scss";
import { FaCopy } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function GameCopyClick() {
  const [copyText, setCopyText] = useState(false);

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
        }}
      >
        <FaCopy className={styles.copyUrlIcon}></FaCopy>
      </div>
      {copyText ? <div className={styles.copiedBox}>URL Copied!</div> : null}
    </div>
  );
}
