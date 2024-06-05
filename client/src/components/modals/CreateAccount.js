import React, { useState, useContext } from "react";
import { Button, Modal, InputGroup, Form, ListGroup, Image } from "react-bootstrap";
const CreateAccount = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} backdrop='static' keyboard={false} className='mt-5'>
            <Modal.Body>
                <Modal.Header>Данные ваших счетов</Modal.Header>
                <InputGroup style={{ paddingTop: "1rem" }}>
                    <Form.Control placeholder='Введите новый email (login)' aria-label='model' />
                </InputGroup>
                <InputGroup style={{ paddingTop: "1rem" }}>
                    <Form.Control placeholder='Введите новый пароль' aria-label='model' />
                </InputGroup>
                <InputGroup style={{ paddingTop: "1rem" }}>
                    <Form.Control placeholder='Введите новый номер телефона' aria-label='model' />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={onHide}>
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
