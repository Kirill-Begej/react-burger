import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./TabList.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export const TabList = ({ bunClick, mainsClick, sauceClick, selectedTab }) => {
  const [current, setCurrent] = useState("bun");

  useEffect(() => {
    setCurrent(selectedTab);
  }, [selectedTab]);

  return (
    <div className={styles.tabs + " mb-10"}>
      <Tab
        value="bun"
        active={current === "bun"}
        onClick={() => {
          setCurrent("bun");
          bunClick();
        }}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === "sauce"}
        onClick={() => {
          setCurrent("sauce");
          sauceClick();
        }}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === "main"}
        onClick={() => {
          setCurrent("main");
          mainsClick();
        }}
      >
        Начинки
      </Tab>
    </div>
  );
};

TabList.propTypes = {
  bunClick: PropTypes.func.isRequired,
  mainsClick: PropTypes.func.isRequired,
  sauceClick: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
};
