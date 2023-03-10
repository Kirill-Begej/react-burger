import PropTypes from "prop-types";
import styles from "./IngredientsCategory.module.css";
import { propTypesData } from "../../utils/prop-types";
import { IngredientItem } from "../IngredientItem/IngredientItem";

export const IngredientsCategory = ({ data, title, onOpen, goTo }) => {
  return (
    <div id={data[0].type} className="ingredient__category">
      <h2 className="subtitle text text_type_main-medium" ref={goTo}>
        {title}
      </h2>
      <ul className={styles.ingredients__list + " pt-6 pl-4"}>
        {data.map((item) => {
          return <IngredientItem data={item} key={item._id} onOpen={onOpen} />;
        })}
      </ul>
    </div>
  );
};

IngredientsCategory.propTypes = {
  data: PropTypes.arrayOf(propTypesData.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  goTo: PropTypes.object.isRequired,
};
