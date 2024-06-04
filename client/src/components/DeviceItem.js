import React from "react";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { useContext, useEffect } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const DeviceItem = ({ device }) => {
    const { currency } = useContext(Context);

    const navigate = useNavigate();
    return (
        <Card
            style={{ cursor: "pointer" }}
            className='my-1 mx-1 col-md-3 col-5'
            onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}>
            <Image
                className={"align-self-center card-img-top"}
                width={200}
                height={"auto"}
                src={process.env.REACT_APP_API_URL + device.img}
            />
            <div
                className={"text-black-50 d-flex justify-content-around align-items-end mb-3"}
                style={{ height: "100%" }}>
                <div style={{ color: "darkslategray" }} className='text-center d-flex flex-column'>
                    {device.name}
                    <span style={{ fontWeight: "bold", color: "darkslategray" }}>
                        {device.price *
                            (currency.selectedCurrency.value || currency.currency[3].value).toFixed(
                                2
                            )}{" "}
                        {currency.selectedCurrency.name || currency.currency[3].name}{" "}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default DeviceItem;
