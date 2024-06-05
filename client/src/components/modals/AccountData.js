import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, InputGroup, Form, ListGroup, Image, ListGroupItem } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
const AccountData = observer(({ show, onHide }) => {
    const { account } = useContext(Context);
    return (
        <Modal show={show} onHide={onHide} backdrop='static' keyboard={false} className='mt-5'>
            <Modal.Body>
                <Modal.Header>Данные ваших счетов</Modal.Header>
                <ListGroup>
                    {account.length >= 0 ? (
                        account.map((data) => {
                            <ListGroupItem>
                                <div>{data.id}</div>
                                <div>
                                    <div>{data.balance}</div>
                                    <div>{data.unit}</div>
                                </div>
                            </ListGroupItem>;
                        })
                    ) : (
                        <ListGroupItem>Вы не создали счёт</ListGroupItem>
                    )}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AccountData;
