import { useSelector } from "../../services/hooks";
import { useParams, useLocation } from "react-router-dom";
import styles from "./IngredientContent.module.css";
import { Property } from "./Property/Property";
import { IIngredientData } from "../../utils/types";

export const IngredientContent = () => {
  const { id } = useParams();
  const location = useLocation();
  const modal = location?.state?.modal;

  const { ingredients } = useSelector((store) => store.ingredients);

  const ingredient = ingredients.find(
    (item: IIngredientData) => item._id === id
  );

  return (
    <div className={styles.container}>
      <h2
        className={styles.title + " text text_type_main-large"}
        style={modal ? { alignSelf: "start" } : { alignSelf: "center" }}
      >
        Детали ингредиента
      </h2>
      <img
        className={styles.image + " mb-4"}
        src={ingredient ? ingredient.image_large : ""}
        alt={ingredient ? ingredient.name : ""}
      />
      <h3 className={styles.subtitle + " text text_type_main-medium"}>
        {ingredient ? ingredient.name : ""}
      </h3>
      <div className={styles.properties}>
        <Property
          title="Калории,ккал"
          value={ingredient ? ingredient.calories : 0}
        />
        <Property
          title="Белки, г"
          value={ingredient ? ingredient.proteins : 0}
        />
        <Property title="Жиры, г" value={ingredient ? ingredient.fat : 0} />
        <Property
          title="Углеводы, г"
          value={ingredient ? ingredient.carbohydrates : 0}
        />
      </div>
    </div>
  );
};
