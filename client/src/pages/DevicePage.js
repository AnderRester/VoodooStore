import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { addToBasket, fetchOneDevice } from "../http/deviceAPI";
import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const { id } = useParams();
    const { user } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneDevice(id).then((data) => setDevice(data));
    }, []);

    const add = () => {
        const formData = new FormData();
        formData.append("basketId", localStorage.getItem("userId"));
        formData.append("deviceId", id);
        addToBasket(formData).then((response) => alert(`Товар ` + device.name + ` был добавлен в вашу корзину!`));
    };

    return (
        <Container className={"my-5 py-5"}>
            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-center">
                    <Image
                        width={"auto"}
                        height={900}
                        src={process.env.REACT_APP_API_URL + device.img}
                        style={{ objectFit: "cover" }}
                        className="img-fluid"
                    />
                </Col>
                <Col md={6}>
                    <Card className={"d-flex py-4"} style={{ border: "none" }}>
                        <Row>
                            <h2 className={"my-3"}>{device.name}</h2>
                        </Row>
                        <Row className="py-3">
                            {device.info.map((info, index) => (
                                <Row key={info.id}>
                                    <h5 style={{ fontWeight: 400 }}>
                                        {info.title}: {info.description}
                                    </h5>
                                </Row>
                            ))}
                        </Row>
                        <h3 className="mt-4 mb-3 text-center">{device.price} MDL</h3>
                        {user.isAuth ? (
                            <Button className={"my-3"} variant={"outline-dark"} onClick={add}>
                                Купить в один клик
                            </Button>
                        ) : (
                            <Button className={"my-3"} variant={"outline-dark"} onClick={() => navigate(LOGIN_ROUTE)}>
                                Купить анонимно
                            </Button>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DevicePage;
