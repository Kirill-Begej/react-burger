import { useState, useRef, FormEvent } from "react";
import { useDispatch } from "../../services/hooks";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getLogin } from "../../services/actions/login";
import { request } from "../../utils/burger-api";
import { deleteBearer, setCookie } from "../../utils/cookies";
import { useForm } from "../../hooks/useForm";

export const RegisterForm = () => {
  const { values, handleChange } = useForm({});

  const [passwordIcon, setPasswordIcon] = useState<any>("ShowIcon");
  const [passwordType, setPasswordType] = useState<any>("password");

  const dispatch = useDispatch();
  const passwordRef = useRef<any>(null);
  const navigate = useNavigate();

  const location = useLocation();

  const fromPage = location.state?.from || "/";

  const onSubmitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.name && values.email && values.password) {
      request("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${values.email}`,
          password: `${values.password}`,
          name: `${values.name}`,
        }),
      })
        .then((res: any) => {
          setCookie("accessToken", deleteBearer(res.accessToken), 20);
          setCookie("refreshToken", res.refreshToken);
          setCookie("isAuthenticated", "true");
          dispatch(getLogin(res.user.email, res.user.name));
          navigate(`${fromPage}`, { replace: true });
        })
        .catch(() => alert("При регистрации произошла ошибка."));
    } else {
      alert("Заполните поля Имя, E-mail и Пароль");
    }
  };

  const onIconClick = () => {
    if (passwordRef.current.type === "password") {
      setPasswordType("text");
      setPasswordIcon("HideIcon");
      passwordRef.current.focus();
    } else {
      setPasswordType("password");
      setPasswordIcon("ShowIcon");
      passwordRef.current.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.container} onSubmit={onSubmitFormHandler}>
        <h2 className="text text_type_main-medium mt-0 mb-6">Регистрация</h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => handleChange(e)}
          value={values.name || ""}
          name={"name"}
          error={false}
          errorText={"Введите корректное имя"}
          size={"default"}
          extraClass="mb-6"
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={(e) => handleChange(e)}
          value={values.email || ""}
          name={"email"}
          error={false}
          errorText={"Введите корректный e-mail"}
          size={"default"}
          extraClass="mb-6"
        />
        <Input
          type={passwordType}
          placeholder={"Пароль"}
          onChange={(e) => handleChange(e)}
          icon={passwordIcon}
          value={values.password || ""}
          name={"password"}
          error={false}
          ref={passwordRef}
          onIconClick={onIconClick}
          errorText={"Введите правильный пароль"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Зарегистрироваться
        </Button>
        <div className="text text_type_main-default">
          <span className="mr-2">Уже зарегистрированы?</span>
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
};
