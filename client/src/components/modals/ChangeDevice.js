import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, InputGroup, Form, ListGroup, Image } from "react-bootstrap";
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";

const ChangeDevice = observer(({ show, onHide }) => {
    const { device } = useContext(Context);
    const [name, setName] = useState([""]);
    const [price, setPrice] = useState([0]);
    const [file, setFile] = useState([null]);
    const [info, setInfo] = useState([]);

    const [search, setSeacrh] = useState("");

    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data));
        fetchBrands().then((data) => device.setBrands(data));
    }, []);

    const addInfo = () => {
        setInfo([...info, { title: "", description: "", number: Date.now() }]);
    };
    const removeInfo = (number) => {
        setInfo(info.filter((i) => i.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
    };

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const addDevice = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", `${price}`);
        formData.append("img", file);
        formData.append("brandId", device.selectedBrand.id);
        formData.append("typeId", device.selectedType.id);
        formData.append("info", JSON.stringify(info));
        createDevice(formData).then((data) => onHide());
    };

    return (
        <Modal show={show} onHide={onHide} backdrop='static' keyboard={false} className='mt-5'>
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
                <div>
                    {search === "" ? (
                        <ListGroup>
                            {device.devices.map((item) => (
                                <ListGroup.Item key={item.id}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <Button
                                            variant={"outline-dark"}
                                            className='d-flex align-items-center justify-content-center p-2'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                class='bi bi-pencil'
                                                viewBox='0 0 16 16'>
                                                <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                                            </svg>
                                        </Button>
                                        <span style={{ fontWeight: 500, fontSize: 20 }}>
                                            {item.name}
                                        </span>
                                        <Button
                                            variant={"outline-dark"}
                                            className='d-flex align-items-center justify-content-center p-2'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                class='bi bi-x-circle'
                                                viewBox='0 0 16 16'>
                                                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                                <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                                            </svg>
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <ListGroup>
                            {device.devices
                                .filter((supp) =>
                                    supp.name.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((item) => (
                                    <ListGroup.Item key={item.id}>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <Button
                                                variant={"outline-dark"}
                                                className='d-flex align-items-center justify-content-center p-2'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='16'
                                                    height='16'
                                                    fill='currentColor'
                                                    class='bi bi-pencil'
                                                    viewBox='0 0 16 16'>
                                                    <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                                                </svg>
                                            </Button>
                                            <span style={{ fontWeight: 500, fontSize: 20 }}>
                                                {item.name}
                                            </span>
                                            <Button
                                                variant={"outline-dark"}
                                                className='d-flex align-items-center justify-content-center p-2'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='16'
                                                    height='16'
                                                    fill='currentColor'
                                                    class='bi bi-x-circle'
                                                    viewBox='0 0 16 16'>
                                                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                                    <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                                                </svg>
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                        </ListGroup>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant='primary'>Найти</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeDevice;
