import React from "react";
import styles from "./About.module.css";

import myAbout from "../../../assets/about/myAbout.png";
import cursorIcon from "../../../assets/about/cursorIcon.png";
import serverIcon from "../../../assets/about/serverIcon.png";
import uiIcon from "../../../assets/about/uiIcon.png";


export const About = () => {
  return (
    <section className={styles.container} id="about">
      
      <h2 className={styles.title}>About</h2>
      
      <div className={styles.content}>
        <img src={myAbout} alt="About section picture" className={styles.aboutImage}/>
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={cursorIcon} alt="Machine Learning Icon" />
            
            <div className={styles.aboutItemText}>
              <h3>Machine Learning & Data Analytics</h3>
              <p>
                Applied <strong>Python, NumPy, and scikit-learn</strong> to build and analyze data-driven systems.
              </p>
            </div>
          </li>
          
          <li className={styles.aboutItem}>
            <img src={serverIcon} alt="App Development Icon" />
            <div className={styles.aboutItemText}>
              <h3>App & Software Development</h3>
              <p>
                Developed Android apps in <strong>Java</strong> using <strong>Firebase</strong> with focus on clean UI and performance.
              </p>
            </div>
          </li>

          <li className={styles.aboutItem}>
            <img src={uiIcon} alt="Embedded Systems Icon" />
            <div className={styles.aboutItemText}>
              <h3>Embedded Systems & Hardware Integration</h3>
              <p>
                Built and tested <strong>VHDL-based circuits</strong> and FSM designs on the <strong>DE2 FPGA</strong>.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};