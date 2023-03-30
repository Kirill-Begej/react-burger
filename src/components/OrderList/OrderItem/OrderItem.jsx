import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./OrderItem.module.css";
import { OrderIngredientsList } from "../OrderIngredientsList/OrderIngredientsList";
import { Price } from "../../Price/Price";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSort } from "../../../hooks/useSort";
import { useTimeZone } from "../../../hooks/useTimeZone";

export const OrderItem = ({ data, itemWidth }) => {
  const { ingredients } = useSelector((store) => store.ingredients);

  const { orderIngredientsReverse, orderPrice } = useSort(data.ingredients, ingredients, true);

  const timeZone = useTimeZone(data.createdAt);

  return (
    <li>
      <Link to={`/feed/${data._id}`} className={styles.link + " p-6"} style={itemWidth}>
        <div className={styles.order_id}>
          <div className="text text_type_digits-default">#{data._id}</div>
          <div>
            <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(data.createdAt)} />
            <span className="text text_type_main-default text_color_inactive"> i-GMT{timeZone}</span>
          </div>
        </div>
        <h3 className={styles.title + " text text_type_main-medium"}>{data.name}</h3>
        <div className={styles.ingredients}>
          <OrderIngredientsList orderIngredients={orderIngredientsReverse} />
          <Price price={orderPrice} />
        </div>
      </Link>
    </li>
  );
};
