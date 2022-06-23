import styles from "./IntroHero.module.scss";

const IntroHero = ({ text, subtext = null }) => {
  return (
    <>
      {subtext ? <span className={styles.subtext}>{subtext}</span> : null}
      <h1 className={styles.text}>{text}</h1>
    </>
  );
};

export { IntroHero };
