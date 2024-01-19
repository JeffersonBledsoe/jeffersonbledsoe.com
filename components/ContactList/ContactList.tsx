import Link from "next/link";
import { GitHub, Linkedin, Mail, Twitter } from "react-feather";
import styles from "./ContactList.module.scss";

const ContactListItem = ({ title, link, IconComponent = null }) => {
  return (
    <li>
      <Link href={link}>
        <a>
          <div className={styles.iconText}>{title}</div>
          {IconComponent ?? null}
        </a>
      </Link>
    </li>
  );
};

const ContactList = ({ style }) => {
  return (
    <ul style={style} className={styles.contactList} role="list">
      <ContactListItem
        title="GitHub"
        link="https://github.com/JeffersonBledsoe"
        // IconComponent={<GitHub />}
      />
      <ContactListItem
        title="LinkedIn"
        link="https://www.linkedin.com/in/jeffersonbledsoe/"
        // IconComponent={<Linkedin />}
      />
      <ContactListItem
        title="Mastodon"
        link="https://fosstodon.org/@JeffersonBledsoe"
        // IconComponent={<Linkedin />}
      />
    </ul>
  );
};

export { ContactList };
