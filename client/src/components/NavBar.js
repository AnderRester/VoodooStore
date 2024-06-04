import React, { useContext, useState } from "react";
import { Context } from "../index";
import { Button, Container, Nav, Navbar, Image, Modal, InputGroup, Form, ListGroup } from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE, DEVICE_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate, NavLink } from "react-router-dom";
// import logo from "../assets/black_logo.png";
import logo from "../assets/logo.png";

const NavBar = observer(({ removeFromCart }) => {
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const { device } = useContext(Context);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [search, setSeacrh] = useState("");

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <NavLink className="m-auto" style={{ paddingLeft: 72 }} to={SHOP_ROUTE}>
                    <Image width={70} height={70} src={logo} style={{ filter: "invert(1)" }} />
                </NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse className="justify-content-center align-items-center">
                    {user.isAuth ? (
                        <Nav
                            className="ms-auto"
                            style={{
                                maxHeight: "240px",
                                color: "white",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                variant={"outline-light"}
                                className="ms-3 my-4"
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" height="1.5em" width="1.5em">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M12 14v8H4a8 8 0 018-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9 4h1v5h-8v-5h1v-1a3 3 0 016 0v1zm-2 0v-1a1 1 0 00-2 0v1h2z" />
                                </svg>
                            </Button>
                            <Button variant={"outline-light"} className="ms-3" onClick={() => navigate(CART_ROUTE)}>
                                <svg fill="currentColor" viewBox="0 0 16 16" height="1.5em" width="1.5em">
                                    <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                </svg>
                            </Button>
                            <Button
                                variant={"outline-light"}
                                className={"ms-3 my-4 seacrh_navbar"}
                                onClick={handleShow}
                            >
                                <svg fill="currentColor" viewBox="0 0 16 16" height="1.3em" width="1.3em">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </Button>
                            <Button variant={"outline-light"} className="ms-3 my-4" onClick={() => logOut()}>
                                Выход
                            </Button>
                        </Nav>
                    ) : (
                        <Nav className="ms-auto" style={{ maxHeight: "150px", color: "white" }}>
                            <Button variant={"outline-light"} className={"mt-2"} onClick={() => navigate(LOGIN_ROUTE)}>
                                Войти
                            </Button>
                            <Button variant={"outline-light"} className={"mt-2 ms-2"} onClick={handleShow}>
                                <svg fill="currentColor" viewBox="0 0 16 16" height="1.3em" width="1.3em">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </Button>
                        </Nav>
                    )}
                    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="mt-5">
                        <Modal.Header closeButton>
                            <Modal.Title>Поиск</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <InputGroup>
                                <Form.Control
                                    placeholder="Введите модель"
                                    aria-label="model"
                                    aria-describedby="basic-addon1"
                                    value={search}
                                    onChange={(e) => setSeacrh(e.target.value)}
                                />
                            </InputGroup>
                            <hr />
                            <ListGroup.Item>
                                {search === "" ? (
                                    <ListGroup.Item>Вы ничего не ввели в строке поиска</ListGroup.Item>
                                ) : (
                                    device.devices
                                        .filter((supp) => supp.name.toLowerCase().includes(search.toLowerCase()))
                                        .map((item) => (
                                            <ListGroup.Item
                                                key={item.id}
                                                onClick={() => navigate(DEVICE_ROUTE + "/" + item.id)}
                                            >
                                                <div className="d-flex justify-content-around align-items-center">
                                                    <Image
                                                        style={{ width: 120, height: "auto" }}
                                                        src={process.env.REACT_APP_API_URL + item.img}
                                                    />
                                                    <span style={{ fontWeight: 500, fontSize: 24 }}>{item.name}</span>
                                                </div>
                                            </ListGroup.Item>
                                        ))
                                )}
                            </ListGroup.Item>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Закрыть
                            </Button>
                            <Button variant="primary">Найти</Button>
                        </Modal.Footer>
                    </Modal>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;
