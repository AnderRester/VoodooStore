import {
    Nav,
    DropdownButton,
    Dropdown,
    Button,
    Modal,
    InputGroup,
    Form,
    ListGroup,
    Image,
} from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE, SHOP_ROUTE } from "../utils/consts";

const Filters = observer(() => {
    const navigate = useNavigate();
    const { device } = useContext(Context);
    const { currency } = useContext(Context);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [search, setSeacrh] = useState("");

    return (
        <Nav className='p-1 mb-3 bg-dark justify-content-end filters_nav'>
            <Nav.Item as='li' className='mx-1'>
                <DropdownButton id='dropdown-basic-button' title='Валюта' variant='dark'>
                    {currency.currency.map((item) => (
                        <Dropdown.Item
                            style={{ cursor: "pointer" }}
                            key={item.id}
                            active={item.id === currency.selectedCurrency.id}
                            onClick={() => {
                                currency.setSelectedCurrency(item);
                                navigate(SHOP_ROUTE);
                            }}>
                            {item.name}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </Nav.Item>
            <Nav.Item as='li' className='mx-1'>
                <DropdownButton id='dropdown-basic-button' title='Тип' variant='dark'>
                    {device.types.map((type) => (
                        <Dropdown.Item
                            style={{ cursor: "pointer" }}
                            active={type.id === device.selectedType.id}
                            key={type.id}
                            onClick={() => device.setSelectedType(type)}>
                            {type.name}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </Nav.Item>
            <Nav.Item as='li' className='mx-1'>
                <DropdownButton id='dropdown-basic-button' title='Бренд' variant='dark'>
                    {device.brands.map((brand) => (
                        <Dropdown.Item
                            style={{ cursor: "pointer" }}
                            key={brand.id}
                            onClick={() => device.setSelectedBrand(brand)}
                            active={brand.id === device.selectedBrand.id}>
                            {brand.name}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </Nav.Item>
            <Nav.Item as='li' className='mx-1'>
                <Button variant='dark' onClick={handleShow}>
                    <svg fill='currentColor' viewBox='0 0 16 16' height='1.3em' width='1.3em'>
                        <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                    </svg>
                </Button>
            </Nav.Item>

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
                            <ListGroup.Item>Вы ничего не ввели в строке поиска</ListGroup.Item>
                        ) : (
                            device.devices
                                .filter((supp) =>
                                    supp.name.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((item) => (
                                    <ListGroup.Item
                                        key={item.id}
                                        onClick={() => navigate(DEVICE_ROUTE + "/" + item.id)}>
                                        <div className='d-flex justify-content-around align-items-center'>
                                            <Image
                                                style={{ width: 120, height: "auto" }}
                                                src={process.env.REACT_APP_API_URL + item.img}
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
        </Nav>
    );
});

export default Filters;
