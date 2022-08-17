import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { getStream, takePhoto } from "../utils/takePhoto";

const Home: NextPage = () => {
  useEffect(() => {
    getStream();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>How you feeling today?</h1>

        <img id="imageTag" />
        <video autoPlay style={{ width: "240px", height: "180px" }}></video>

        <button onClick={takePhoto}>Tirar foto</button>
      </main>
    </div>
  );
};

export default Home;
