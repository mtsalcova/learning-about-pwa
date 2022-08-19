import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getStream, takePhoto } from "../utils/takePhoto";

const Home: NextPage = () => {
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    getStream();
  }, []);

  function initTakePhoto() {
    setButtonPressed(!buttonPressed);
  }

  useEffect(() => {
    if (buttonPressed) {
      takePhoto();
    }
  }, [buttonPressed]);

  const classImg = !buttonPressed ? styles.hide : "";

  return (
    <section>
      <Head>
        <title>How you feeling today?</title>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>How you feeling today?</h1>

        <div className={styles["box-board"]}>
          <div className={styles.board}>
            {buttonPressed && <img className={classImg} id="imageTag" />}
            {!buttonPressed && (
              <img src={""} className={classImg} id="imageTag" />
            )}
            <video autoPlay className={styles.video}></video>
          </div>
          <button
            className={buttonPressed ? styles.icon : ""}
            onClick={initTakePhoto}
          ></button>
        </div>
      </main>
    </section>
  );
};

export default Home;
