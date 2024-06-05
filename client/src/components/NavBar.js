import React, { useContext, useState } from "react";
import { Context } from "../index";
import {
    Button,
    Container,
    Nav,
    Navbar,
    Image,
    Modal,
    InputGroup,
    Form,
    ListGroup,
} from "react-bootstrap";
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
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container fluid>
                <NavLink className='m-auto' style={{ paddingLeft: 72 }} to={SHOP_ROUTE}>
                    <Image width={70} height={70} src={logo} style={{ filter: "invert(1)" }} />
                </NavLink>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse className='justify-content-center align-items-center'>
                    {user.isAuth ? (
                        <Nav
                            className='ms-auto'
                            style={{
                                maxHeight: "240px",
                                color: "white",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>
                            <Button
                                variant={"outline-light"}
                                className='ms-3 my-4'
                                onClick={() => logOut()}>
                                Выход
                            </Button>
                        </Nav>
                    ) : (
                        <Nav className='ms-auto' style={{ maxHeight: "150px", color: "white" }}>
                            <Button
                                variant={"outline-light"}
                                className={"mt-2"}
                                onClick={() => navigate(LOGIN_ROUTE)}>
                                Войти
                            </Button>
                        </Nav>
                    )}
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop='static'
                        keyboard={false}
                        className='mt-5'>
                        <Modal.Header closeButton>
                            <Modal.Title>Поиск</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <InputGroup>
                                <Form.Control
                                    placeholder='Введите модель'
                                    aria-label='model'
                                    aria-describedby='basic-addon1'
                                    value={search}
                                    onChange={(e) => setSeacrh(e.target.value)}
                                />
                            </InputGroup>
                            <hr />
                            <ListGroup.Item>
                                {search === "" ? (
                                    <ListGroup.Item>
                                        Вы ничего не ввели в строке поиска
                                    </ListGroup.Item>
                                ) : (
                                    device.devices
                                        .filter((supp) =>
                                            supp.name.toLowerCase().includes(search.toLowerCase())
                                        )
                                        .map((item) => (
                                            <ListGroup.Item
                                                key={item.id}
                                                onClick={() =>
                                                    navigate(DEVICE_ROUTE + "/" + item.id)
                                                }>
                                                <div className='d-flex justify-content-around align-items-center'>
                                                    <Image
                                                        style={{ width: 120, height: "auto" }}
                                                        src={
                                                            process.env.REACT_APP_API_URL + item.img
                                                        }
                                                    />
                                                    <span style={{ fontWeight: 500, fontSize: 24 }}>
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </ListGroup.Item>
                                        ))
                                )}
                            </ListGroup.Item>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={handleClose}>
                                Закрыть
                            </Button>
                            <Button variant='primary'>Найти</Button>
                        </Modal.Footer>
                    </Modal>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;
