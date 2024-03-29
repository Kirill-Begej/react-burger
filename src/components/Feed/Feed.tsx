import { useState, useEffect } from "react";
import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import styles from "./Feed.module.css";
import { Status } from "../Status/Status";
import { OrderIngredientImage } from "../OrderIngredientImage/OrderIngredientImage";
import { Price } from "../Price/Price";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useTimeZone } from "../../hooks/useTimeZone";
import {
  IWsOrders,
  ICountItems,
  IIngredientData,
  IIngredientCount,
} from "../../utils/types";

export const Feed = () => {
  const data = useSelector((store) => store.data.messages);
  const { ingredients } = useSelector((store) => store.ingredients);

  const [orderData, setOrderData] = useState<IWsOrders | null | undefined>(
    null
  );
  const [orderIngredients, setOrderIngredients] = useState<
    Array<IIngredientData & IIngredientCount> | []
  >([]);
  const [orderPrice, setOrderPrice] = useState<number | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (data[0]) {
      setOrderData(
        data[0].orders.find((item: IWsOrders) => item.number === Number(id))
      );
    }
  }, [id, data]);

  useEffect(() => {
    if (orderData) {
      if (ingredients && orderData.ingredients) {
        const countItems: ICountItems = {};

        for (const item of orderData.ingredients) {
          countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
        }

        const orderIngredients: Array<IIngredientData & IIngredientCount> =
          ingredients.reduce(
            (
              prevValue: Array<IIngredientData & IIngredientCount>,
              item: IIngredientData
            ) => {
              for (const key in countItems) {
                if (key === item._id) {
                  prevValue.push({ ...item, count: countItems[key] });
                }
              }

              return prevValue;
            },
            []
          );

        const orderPrice = orderIngredients.reduce(
          (prevValue: number, item: IIngredientData & IIngredientCount) =>
            prevValue + item.price * item.count,
          0
        );

        setOrderIngredients(orderIngredients);
        setOrderPrice(orderPrice);
      }
    }
  }, [ingredients, orderData]);

  const timeZone = useTimeZone(orderData ? orderData.createdAt : "");

  return (
    <section className={styles.wrapper}>
      {orderIngredients && orderPrice && (
        <div className={styles.container}>
          <p
            className={styles.order_id + " text text_type_digits-default mb-10"}
          >
            #{orderData ? orderData.number : null}
          </p>
          <h2 className="text text_type_main-medium mb-3">
            {orderData ? orderData.name : null}
          </h2>
          <div className="mb-10">
            <Status status={orderData ? orderData.status : ""} />
          </div>
          <h3 className="text text_type_main-medium mb-6">Состав:</h3>
          <div className={styles.list_container + " mb-10"}>
            <ul className={styles.list}>
              {orderIngredients.map((item) => {
                return (
                  <li key={item._id} className={styles.item + " mr-6"}>
                    <div className={styles.image_container}>
                      <OrderIngredientImage data={item} count={false} />
                    </div>
                    <p
                      className={styles.title + " text text_type_main-default"}
                    >
                      {item.name}
                    </p>
                    <Price price={item.price} count={item.count} />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.info}>
            <div>
              <FormattedDate
                className="text text_type_main-default text_color_inactive"
                date={new Date(orderData ? orderData.createdAt : "")}
              />
              <span className="text text_type_main-default text_color_inactive">
                {" "}
                i-GMT{timeZone}
              </span>
            </div>
            <Price price={orderPrice} />
          </div>
        </div>
      )}
    </section>
  );
};
