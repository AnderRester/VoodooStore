import React, { useState, useContext } from "react";
import { Button, Modal, InputGroup, Form, ListGroup, Image } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../../utils/consts";
import { updateUserData } from "../../http/userAPI";
const AccountSettings = ({ show, onHide }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const click = async () => {
        try {
            let data;
            data = await updateUserData(email, password, phone);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };
    return (
        <Modal show={show} onHide={onHide} backdrop='static' keyboard={false} className='mt-5'>
            <Modal.Body>
                <Modal.Header>Меню изменения данных аккаунта</Modal.Header>
                <InputGroup style={{ paddingTop: "1rem" }}>
                    <Form.Control
                        placeholder='Введите новый email (login)'
                        aria-label='model'
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </InputGroup>
                <InputGroup style={{ paddingTop: "1rem" }}>
                    <Form.Control
                        placeholder='Введите новый пароль'
                        aria-label='model'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </InputGroup>
                <InputGroup style={{ paddingTop: "1rem" }}>
                    <Form.Control
                        placeholder='Введите новый номер телефона'
                        aria-label='model'
                        value={phone}
                        name='phone'
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={click}>
                    Подтвердить
                </Button>
                <Button variant='secondary' onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AccountSettings;
