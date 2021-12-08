import Image from "next/image";
import Link from "next/link";
import logo from "../../public/favicon.svg";
import styles from "./Navigation.module.scss";

const imageSize = 80;

const NavItem = ({ title, link }) => {
  return <li className={styles.navListItem}>{title}</li>;
};

const Navigation = () => {
  return (
    <header className={styles.navigation}>
      {/* eslint-disable-next-line @next/next/link-passhref */}
      <Link href="/">
        <div style={{ float: "left" }}>
          <Image
            height={imageSize}
            width={imageSize}
            src={logo}
            alt="Jefferson Bledsoe"
          />
        </div>
      </Link>
      <ul className={styles.navList}>
        <NavItem title="Home" link="/" />
        {/* <NavItem title="About" link="/about" /> */}
        <NavItem title="Get in touch" link="/projects" />
      </ul>
    </header>
  );
};

export { Navigation };
