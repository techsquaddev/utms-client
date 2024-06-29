import React, { useState } from "react";
import styles from "./navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.nav_container}>
        <div className={styles.logo_wrapper}>
          <img className={styles.logo} src={Logo} alt="Logo" />
        </div>
        <div className={styles.menu_icon} onClick={toggleMenu}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
        <div className={`${styles.menu} ${menuOpen ? styles.menu_open : ""}`}>
          <a href="#" className={styles.menu_item}>
            Home
          </a>
          <a href="#" className={styles.menu_item}>
            Profile
          </a>
          <a href="#" className={styles.menu_item}>
            Added Timetables
          </a>
          <a href="#" className={styles.menu_item}>
            Updated Timetables
          </a>
          <a href="#" className={styles.menu_item}>
            Saved Timetables
          </a>
          <a href="#" className={styles.menu_item}>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
