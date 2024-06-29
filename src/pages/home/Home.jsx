import React from "react";
import styles from "./home.module.css";
import { SearchBar } from "../../components";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home_container}>
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;
