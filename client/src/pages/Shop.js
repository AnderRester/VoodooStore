import React, { useContext, useEffect, useState } from "react";
import { Button, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import AccountSettings from "../components/modals/AccountSettings";
import AccountData from "../components/modals/AccountData";
import CreateAccount from "../components/modals/CreateAccount";

const Shop = observer(() => {
    const [accountSettings, setAccountSettings] = useState(false);
    const [accountInformation, setAccountInformation] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);

    const [transfer, setTransfer] = useState(false);
    const [payService, setPayService] = useState(false);

    const [addMenuVisible, setAddMenuVisible] = useState(true);
    const [changeMenuVisible, setChangeMenuVisible] = useState(false);

    return (
        <div style={{ minHeight: "100vh" }}>
            <div className={"d-flex flex-row"}>
                <ListGroup className='m-4'>
                    <ListGroupItem
                        active={addMenuVisible}
                        onClick={() => {
                            setChangeMenuVisible(false);
                            setAddMenuVisible(true);
                        }}>
                        Мой аккаунт
                    </ListGroupItem>
                    <ListGroupItem
                        active={changeMenuVisible}
                        onClick={() => {
                            setAddMenuVisible(false);
                            setChangeMenuVisible(true);
                        }}>
                        Переводы
                    </ListGroupItem>
                </ListGroup>
                {addMenuVisible ? (
                    <div className='d-flex flex-row flex-wrap align-items-center justify-items-center'>
                        <Button
                            variant={"outline-dark"}
                            className={
                                "mt-4 mx-2 d-flex align-items-center justify-content-center flex-column px-5 py-3"
                            }
                            onClick={() => setAccountSettings(true)}>
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
                            <span className='mt-2'>Настройки Аккаунта</span>
                        </Button>
                        <Button
                            variant={"outline-dark"}
                            className={
                                "mt-4 mx-2 d-flex align-items-center justify-content-center flex-column px-5 py-3"
                            }
                            onClick={() => setAccountInformation(true)}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='48'
                                height='48'
                                fill='currentColor'
                                class='bi bi-wallet2'
                                viewBox='0 0 16 16'>
                                <path d='M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z' />
                            </svg>
                            <span className='mt-2'>Информация о счетах</span>
                        </Button>
                        <Button
                            variant={"outline-dark"}
                            className={
                                "mt-4 mx-2 d-flex align-items-center justify-content-center flex-column px-5 py-3"
                            }
                            onClick={() => setCreateAccount(true)}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='48'
                                height='48'
                                fill='currentColor'
                                class='bi bi-person-vcard'
                                viewBox='0 0 16 16'>
                                <path d='M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5' />
                                <path d='M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z' />
                            </svg>
                            <span className='mt-2'>Открыть счёт</span>
                        </Button>
                    </div>
                ) : (
                    <div className='d-flex flex-row flex-wrap align-items-center justify-items-center'>
                        <Button
                            variant={"outline-dark"}
                            className={
                                "mt-4 mx-2 d-flex align-items-center justify-content-center flex-column px-5 py-3"
                            }
                            onClick={() => setTransfer(true)}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='48'
                                height='48'
                                fill='currentColor'
                                class='bi bi-send'
                                viewBox='0 0 16 16'>
                                <path d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z' />
                            </svg>
                            <span className='mt-2'>Перевод P2P</span>
                        </Button>
                        <Button
                            variant={"outline-dark"}
                            className={
                                "mt-4 mx-2 d-flex align-items-center justify-content-center flex-column px-5 py-3"
                            }
                            onClick={() => setChangeMenuVisible(true)}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='48'
                                height='48'
                                fill='currentColor'
                                class='bi bi-credit-card'
                                viewBox='0 0 16 16'>
                                <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z' />
                                <path d='M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z' />
                            </svg>
                            <span className='mt-2'>Оплата Услуг</span>
                        </Button>
                    </div>
                )}

                <AccountSettings show={accountSettings} onHide={() => setAccountSettings(false)} />
                <AccountData
                    show={accountInformation}
                    onHide={() => setAccountInformation(false)}
                />
                <CreateAccount show={createAccount} onHide={() => setCreateAccount(false)} />
            </div>
        </div>
    );
});

export default Shop;
