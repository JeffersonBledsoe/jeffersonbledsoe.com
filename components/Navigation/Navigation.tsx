import Link from "next/link";
import styles from "./Navigation.module.scss";

type NavMapping = {
  title: string;
  link: string;
};

const NavItem = ({ title, link }: NavMapping) => {
  return (
    <Link href={link}>
      <a>{title}</a>
    </Link>
  );
};

const Navigation = () => {
  const navMappings: NavMapping[] = [
    { title: "Home", link: "/" },
    { title: "Notes/ Garden", link: "/garden" },
  ];
  return (
    <header>
      <nav>
        <ul role="list" className={styles.navList}>
          {navMappings.map((mapping) => {
            return (
              <li key={mapping.link}>
                <NavItem {...mapping} />
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export { Navigation };
