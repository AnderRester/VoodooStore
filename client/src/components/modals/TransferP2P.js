import React, { useState, useContext } from "react";
import { Button, Modal, InputGroup, Form, ListGroup, Image } from "react-bootstrap";
import { transferP2P } from "../../http/userAPI";
import { SHOP_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";

const AccountData = ({ show, onHide }) => {
    const navigate = useNavigate();
    const [toAccountId, setToAccountId] = useState("");
    const [amount, setAmount] = useState("");
    const click = async () => {
        try {
            let data;
            data = await transferP2P(toAccountId, amount);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };
    return (
        <Modal show={show} onHide={onHide} backdrop='static' keyboard={false} className='mt-5'>
            <Modal.Body>
                <Modal.Header>Перевод другому пользователю</Modal.Header>
                <InputGroup style={{ paddingTop: "1rem" }}>
                    <Form.Control
                        placeholder='Введите ID пользователя'
                        aria-label='model'
                        name='toUserId'
                        onChange={(e) => setToAccountId(e.target.value)}
                        value={toAccountId}
                    />
                </InputGroup>
                <InputGroup style={{ paddingTop: "1rem" }}>
                    <Form.Control
                        placeholder='Введите желаемую сумму'
                        aria-label='model'
                        name='amount'
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
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

export default AccountData;
