import React, { useState } from "react";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import styles from "./BurgerIngredients.module.css";
import { IngredientsCategory } from "../IngredientsCategory/IngredientsCategory";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const TabList = ({ bunClick, mainsClick, sauceClick }) => {
  const [current, setCurrent] = useState("one");
  return (
    <div className={styles.tabs + " mb-10"}>
      <Tab
        value="one"
        active={current === "one"}
        onClick={() => {
          setCurrent("one");
          bunClick();
        }}
      >
        Булки
      </Tab>
      <Tab
        value="two"
        active={current === "two"}
        onClick={() => {
          setCurrent("two");
          sauceClick();
        }}
      >
        Соусы
      </Tab>
      <Tab
        value="three"
        active={current === "three"}
        onClick={() => {
          setCurrent("three");
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
};

export const BurgerIngredients = ({ onOpen }) => {
  const { ingredients } = useSelector(store => store.ingredients);

  const buns = React.useMemo(() => {
    return ingredients.filter((item) => item.type === "bun");
  }, [ingredients]);
  const mains = React.useMemo(() => {
    return ingredients.filter((item) => item.type === "main");
  }, [ingredients]);
  const sauces = React.useMemo(() => {
    return ingredients.filter((item) => item.type === "sauce");
  }, [ingredients]);

  const bunRef = React.useRef(null);
  const mainsRef = React.useRef(null);
  const sauceRef = React.useRef(null);

  const bunClick = () => {
    bunRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const mainsClick = () => {
    mainsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sauceClick = () => {
    sauceRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.container + " pt-10"}>
      <h1 className="title text text_type_main-large mb-5">Соберите бургер</h1>
      <TabList
        bunClick={bunClick}
        mainsClick={mainsClick}
        sauceClick={sauceClick}
      />
      <div className={styles.ingredients}>
        <div className={styles.ingredients__container}>
          <IngredientsCategory
            data={buns}
            onOpen={onOpen}
            title="Булки"
            goTo={bunRef}
          />
          <IngredientsCategory
            data={sauces}
            onOpen={onOpen}
            title="Соусы"
            goTo={sauceRef}
          />
          <IngredientsCategory
            data={mains}
            onOpen={onOpen}
            title="Начинки"
            goTo={mainsRef}
          />
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  onOpen: PropTypes.func.isRequired,
};
