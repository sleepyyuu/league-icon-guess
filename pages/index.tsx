import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Game from "../components/Game/Game";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>LoL Skill Issue</title>
        <meta name="description" content="League of Legends mini game ability icon guessing game, ability icon matching game." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3180908358838010"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <header className={styles.gameHeader}>
        <div></div>
        <div className={styles.gameTitle}>League Skill Issue</div>
        <div></div>
      </header>

      <main className={styles.main}>
        <Game></Game>
      </main>
    </div>
  );
}
