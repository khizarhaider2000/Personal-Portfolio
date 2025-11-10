import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({ project }) => {
  const { title, imageSrc, description, skills, demo, source } = project;

  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
      />

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li className={styles.skill} key={id}>
            {skill}
          </li>
        ))}
      </ul>

      <div className={styles.links}>
        <a
          className={styles.linkButton}
          href={demo}
          target="_blank"
          rel="noreferrer"
        >
          Demo
        </a>
        <a
          className={styles.linkButton}
          href={source}
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </div>
    </div>
  );
};
