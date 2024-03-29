import { useDispatch } from "../../services/hooks";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./ProfileMenu.module.css";
import { CustomProfileLink } from "./CustomProfileLink/CustomProfileLink";
import { singOut } from "../../services/actions/login";

export const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const active = {
    color: "#F2F2F3",
  };

  const setActive = ({ isActive }: any) => (isActive ? active : undefined);

  const onClickExitHandler = () => {
    dispatch(singOut("/login", navigate, location));
  };

  return (
    <nav className={styles.nav + " mr-15"}>
      <ul className={styles.menu}>
        <li>
          <NavLink
            to={"/profile"}
            className={
              styles.link + " text text_type_main-medium text_color_inactive"
            }
            style={setActive}
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/orders"}
            className={
              styles.link + " text text_type_main-medium text_color_inactive"
            }
            style={setActive}
            state={{ modal: true }}
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <CustomProfileLink onClick={onClickExitHandler}>
            Выход
          </CustomProfileLink>
        </li>
      </ul>
    </nav>
  );
};
