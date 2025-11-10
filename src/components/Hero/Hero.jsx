import React from "react";
import head from "../../../assets/hero/head.png"; 
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Khizar</h1>
        <p className={styles.description}>
          I'm a 3rd year university student studying 
                Computer Enginering at the University of Ottawa.
                Reach out if you'd like to learn more!
        </p>
        <a href="mailto:khizarhaider8@hotmail.com" className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
     <img
                src={head}
                alt="Hero Image of Me" className = {styles.heroImg}/>
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};