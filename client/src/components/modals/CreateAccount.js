import React, { useState, useContext } from "react";
import { Button, Modal, InputGroup, Form, ListGroup, Image } from "react-bootstrap";
import { createAccount } from "../../http/userAPI";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../../utils/consts";
const CreateAccount = ({ show, onHide }) => {
    const navigate = useNavigate();
    const [unit, setUnit] = useState("");
    const click = async () => {
        try {
            let data;
            data = await createAccount(unit);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };
    return (
        <Modal show={show} onHide={onHide} backdrop='static' keyboard={false} className='mt-5'>
            <Modal.Body>
                <Modal.Header>Данные ваших счетов</Modal.Header>
                <InputGroup style={{ paddingTop: "1rem" }}>
                    <Form.Control
                        placeholder='Введите желаемую условную единицу'
                        aria-label='model'
                        name='unit'
                        onChange={(e) => setUnit(e.target.value)}
                        value={unit}
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

export default CreateAccount;
