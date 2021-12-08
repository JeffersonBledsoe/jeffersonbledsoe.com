import styles from "./SkipLink.module.scss";

const SkipLink = () => {
  return (
    <a id="skip-nav" className={styles.skiplink} href="#main-content">
      Skip to content
    </a>
  );
};

export { SkipLink };
