import React, { useState } from "react";
import { Button, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import ChangeType from "../components/modals/ChangeType";
import ChangeBrand from "../components/modals/ChangeBrand";
import ChangeDevice from "../components/modals/ChangeDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    const [changeBrandVisible, setChangeBrandVisible] = useState(false);
    const [changeTypeVisible, setChangeTypeVisible] = useState(false);
    const [changeDeviceVisible, setChangeDeviceVisible] = useState(false);

    const [addMenuVisible, setAddMenuVisible] = useState(true);
    const [changeMenuVisible, setChangeMenuVisible] = useState(false);

    return (
        <div className={"d-flex flex-row"}>
            <ListGroup className='m-4'>
                <ListGroupItem
                    active={addMenuVisible}
                    onClick={() => {
                        setChangeMenuVisible(false);
                        setAddMenuVisible(true);
                    }}>
                    Добавление
                </ListGroupItem>
                <ListGroupItem
                    active={changeMenuVisible}
                    onClick={() => {
                        setAddMenuVisible(false);
                        setChangeMenuVisible(true);
                    }}>
                    Внесение изменений
                </ListGroupItem>
            </ListGroup>
            {addMenuVisible ? (
                <div className='d-flex flex-row flex-wrap align-items-center justify-items-center'>
                    <Button
                        variant={"outline-dark"}
                        className={
                            "mt-4 mx-2 d-flex align-items-center justify-content-center flex-column px-5 py-3"
                        }
                        onClick={() => setTypeVisible(true)}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='48'
                            height='48'
                            fill='currentColor'
                            class='bi bi-list-task'
                            viewBox='0 0 16 16'>
                            <path
                                fill-rule='evenodd'
                                d='M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z'
                            />
                            <path d='M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z' />
                            <path
                                fill-rule='evenodd'
                                d='M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z'
                            />
                        </svg>
                        <span className='mt-2'>Добавить тип</span>
                    </Button>
                    <Button
                        variant={"outline-dark"}
                        className={
                            "mt-4 mx-2 d-flex align-items-center justify-content-center flex-column px-5 py-3"
                        }
                        onClick={() => setBrandVisible(true)}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='48'
                            height='48'
                            fill='currentColor'
                            class='bi bi-tags'
                            viewBox='0 0 16 16'>
                            <path d='M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z' />
                            <path d='M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z' />
                        </svg>
                        <span className='mt-2'>Добавить бренд</span>
                    </Button>
                    <Button
                        variant={"outline-dark"}
                        className={
                            "mt-4 mx-2 d-flex align-items-center justify-content-center flex-column px-5 py-3"
                        }
                        onClick={() => setDeviceVisible(true)}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='48'
                            height='48'
                            fill='currentColor'
                            class='bi bi-bag-plus'
                            viewBox='0 0 16 16'>
                            <path
                                fill-rule='evenodd'
                                d='M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z'
                            />
                            <path d='M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z' />
                        </svg>
                        <span className='mt-2'>Добавить Товар</span>
                    </Button>
                </div>
            ) : (
                <div className='d-flex flex-row flex-wrap align-items-center justify-items-center'>
                    <Button
                        variant={"outline-dark"}
                        className={
                            "mt-4 mx-2 d-flex align-items-center justify-content-center flex-column px-5 py-3"
                        }
                        onClick={() => setChangeTypeVisible(true)}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='48'
                            height='48'
                            fill='currentColor'
                            class='bi bi-list-task'
                            viewBox='0 0 16 16'>
                            <path
                                fill-rule='evenodd'
                                d='M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z'
                            />
                            <path d='M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z' />
                            <path
                                fill-rule='evenodd'
                                d='M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z'
                            />
                        </svg>
                        <span className='mt-2'>Изменить тип</span>
                    </Button>
                    <Button
                        variant={"outline-dark"}
                        className={
                            "mt-4 mx-2 d-flex align-items-center justify-content-center flex-column px-5 py-3"
                        }
                        onClick={() => setChangeBrandVisible(true)}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='48'
                            height='48'
                            fill='currentColor'
                            class='bi bi-tags'
                            viewBox='0 0 16 16'>
                            <path d='M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z' />
                            <path d='M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z' />
                        </svg>
                        <span className='mt-2'>Изменить бренд</span>
                    </Button>
                    <Button
                        variant={"outline-dark"}
                        className={
                            "mt-4 mx-2 d-flex align-items-center justify-content-center flex-column px-5 py-3"
                        }
                        onClick={() => setChangeDeviceVisible(true)}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='48'
                            height='48'
                            fill='currentColor'
                            class='bi bi-bag-plus'
                            viewBox='0 0 16 16'>
                            <path
                                fill-rule='evenodd'
                                d='M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z'
                            />
                            <path d='M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z' />
                        </svg>
                        <span className='mt-2'>Изменить Товар</span>
                    </Button>
                </div>
            )}
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />

            <ChangeType show={changeTypeVisible} onHide={() => setChangeTypeVisible(false)} />
            <ChangeBrand show={changeBrandVisible} onHide={() => setChangeBrandVisible(false)} />
            <ChangeDevice show={changeDeviceVisible} onHide={() => setChangeDeviceVisible(false)} />
        </div>
    );
};

export default Admin;
