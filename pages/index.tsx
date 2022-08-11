import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Game from "../components/Game/Game";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>LoL Skill Issue</title>
        <meta name="description" content="League of Legends ability/passive icon guessing game." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.gameHeader}>
        <div></div>
        <div className={styles.gameTitle}>LoL Skill Issue</div>
        <div></div>
      </header>

      <main className={styles.main}>
        <Game></Game>
      </main>
    </div>
  );
}
