import React, { useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.css";
import { ConstructorItem } from "../ConstructorItem/ConstructorItem";
import { ConstructorOrder } from "./ConstructorOrder/ConstructorOrder";
import { setIngredientsId } from "../../services/actions/orderDetails";
import {
  addingIngredient,
  deleteIngredient,
  moveIngredient,
} from "../../services/actions/burgerConstructor";

export const BurgerConstructor = ({ onOpen }) => {
  const ingredientsAll = useSelector((store) => store.ingredients.ingredients);
  const selectedIngredients = useSelector((store) => store.burgerConstructor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIngredientsId(ingredientsId()));
  }, [dispatch, selectedIngredients]); // eslint-disable-line

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemIngredient) {
      dispatch(
        addingIngredient(
          itemIngredient.type,
          ingredientsAll.find((item) => item._id === itemIngredient.id)
        )
      );
    },
  });

  const bun = selectedIngredients.find((item) => item.type === "bun");
  const ingredients = selectedIngredients.filter((item) => item.type !== "bun");

  const totalPrice = useMemo(
    () =>
      bun.price * 2 + ingredients.reduce((acc, item) => (acc += item.price), 0),
    [bun, ingredients]
  );

  const ingredientsId = () => {
    const id = selectedIngredients.map((item) => item._id);
    id.push(selectedIngredients[0]._id);
    return id;
  };

  const handleDeleteIngredient = useCallback(
    (index) => {
      dispatch(deleteIngredient(index));
    },
    [dispatch]
  );

  const moveElement = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(moveIngredient(dragIndex, hoverIndex));
    },
    [dispatch]
  );

  const renderIngredient = useCallback(
    (item, index) => {
      return (
        <ConstructorItem
          data={item}
          key={item.key}
          index={index}
          keyString={item.key}
          onDelete={handleDeleteIngredient}
          moveElement={moveElement}
        />
      );
    },
    [handleDeleteIngredient, moveElement]
  );

  return (
    <section
      className={styles.constructor__container + " pt-25 pl-4"}
      ref={dropTarget}
    >
      <ul className={styles.constructor__list + " mb-10"}>
        <ConstructorItem
          type="top"
          isLocked={true}
          text=" (????????)"
          data={bun}
          noIcon={true}
        />
        <li className={styles.constructor__item_center}>
          <ul className={styles.list}>
            {ingredients.map((item, i) => renderIngredient(item, i))}
          </ul>
        </li>
        <ConstructorItem
          type="bottom"
          isLocked={true}
          text=" (??????)"
          data={bun}
          noIcon={true}
        />
      </ul>
      <ConstructorOrder totalPrice={totalPrice} onOpen={onOpen} />
    </section>
  );
};

BurgerConstructor.propTypes = {
  onOpen: PropTypes.func.isRequired,
};
