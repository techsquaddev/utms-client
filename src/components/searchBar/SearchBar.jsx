import React from "react";
import styles from "./searchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.inputSection}>
      <div className={styles.inputBox}>
        <input
          type="text"
          className={styles.textInput}
          id="text-input"
          placeholder="කැමති දෙයක් ලියන්න..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
