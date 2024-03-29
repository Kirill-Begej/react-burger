import { useSelector, useDispatch } from "../services/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./home.module.css";
import { BurgerIngredients } from "../components/BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../components/BurgerConstructor/BurgerConstructor";
import { Modal } from "../components/Modal/Modal";
import { OrderDetails } from "../components/OrderDetails/OrderDetails";
import {
  getOrderNumber,
  hideOrederModal,
  setOrderLoad,
} from "../services/actions/orderDetails";
import { getCookie } from "../utils/cookies";

export const HomePage = () => {
  const { ingredientsLoading } = useSelector((store) => store.ingredients);
  const { orderDetailsOpen, orderDetailsLoading } = useSelector(
    (store) => store.orderDetails
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let modal = false;

  if (location.pathname === "/" || location?.state?.modal) {
    modal = true;
  }

  const handleOpenModalConstructor = () => {
    if (!getCookie("isAuthenticated")) {
      navigate("/login");
    } else {
      dispatch(setOrderLoad());
      dispatch(getOrderNumber());
    }
  };

  const handleCloseModalConstructor = () => {
    dispatch(hideOrederModal());
  };

  return (
    <>
      {ingredientsLoading && (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.content}>
            {modal && (
              <div className={styles.container}>
                <BurgerIngredients />
                <BurgerConstructor onOpen={handleOpenModalConstructor} />
              </div>
            )}
            <Outlet />
          </main>
        </DndProvider>
      )}
      {orderDetailsOpen && (
        <Modal
          onClose={handleCloseModalConstructor}
          modalClose={true}
          buttonClose={true}
        >
          <OrderDetails />
        </Modal>
      )}
      {orderDetailsLoading && (
        <Modal onClose={() => undefined} modalClose={false} buttonClose={false}>
          <p className="text text_type_main-large">Загрузка...</p>
        </Modal>
      )}
    </>
  );
};
