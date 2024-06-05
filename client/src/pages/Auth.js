import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [idnp, setIdnp] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(idnp, email, password, phone);
            }
            user.setUser(user);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <Container
            className={"d-flex justify-content-center align-items-center"}
            style={{ height: window.innerHeight - 50 }}>
            <Card style={{ width: "50%" }} className={"p-4"}>
                <h4 className={"m-auto"}>{isLogin ? "Авторизация" : "Регистрация"}</h4>
                {isLogin ? (
                    <Form className={"d-flex flex-column"}>
                        <Form.Control
                            className={"mt-4"}
                            name='login'
                            autoComplete='current-username'
                            placeholder={"Введите логин или e-mail"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className={"mt-3"}
                            name='password'
                            placeholder={"Введите пароль"}
                            value={password}
                            autoComplete='current-password'
                            onChange={(e) => setPassword(e.target.value)}
                            type={"password"}
                        />
                        <Button
                            style={{ marginVertical: "1rem" }}
                            variant={"outline-success"}
                            onClick={click}>
                            {isLogin ? "Войти" : "Зарегистрироваться"}
                        </Button>
                        <div className={"d-flex"}>
                            Новый Пользователь?{" "}
                            <NavLink
                                style={{
                                    marginLeft: 8,
                                    textDecoration: "underline",
                                    fontWeight: "500",
                                }}
                                to={REGISTRATION_ROUTE}>
                                Регистрация
                            </NavLink>
                        </div>
                    </Form>
                ) : (
                    <Form className={"d-flex flex-column"}>
                        <Form.Control
                            className={"mt-4"}
                            name='login'
                            autoComplete='current-username'
                            placeholder={"Введите e-mail"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className={"mt-3"}
                            name='password'
                            placeholder={"Введите пароль"}
                            value={password}
                            autoComplete='current-password'
                            onChange={(e) => setPassword(e.target.value)}
                            type={"password"}
                        />
                        <Form.Control
                            className={"mt-3"}
                            name='password'
                            placeholder={"Введите IDNP"}
                            value={idnp}
                            autoComplete='current-password'
                            onChange={(e) => setIdnp(e.target.value)}
                            type={"password"}
                        />
                        <Form.Control
                            className={"mt-3"}
                            name='password'
                            placeholder={"Введите номер телефона"}
                            value={phone}
                            autoComplete='current-password'
                            onChange={(e) => setPhone(e.target.value)}
                            type={"password"}
                        />
                        <Button
                            style={{ marginTop: "1rem", marginBottom: "1rem" }}
                            variant={"outline-success"}
                            onClick={click}>
                            {isLogin ? "Войти" : "Зарегистрироваться"}
                        </Button>
                        <div className={"d-flex"}>
                            Зарегистрированы?{" "}
                            <NavLink
                                style={{
                                    marginLeft: 8,
                                    textDecoration: "underline",
                                    fontWeight: "500",
                                }}
                                to={LOGIN_ROUTE}>
                                Войти
                            </NavLink>
                        </div>
                    </Form>
                )}
            </Card>
        </Container>
    );
});

export default Auth;
