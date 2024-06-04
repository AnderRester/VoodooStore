import React, { useEffect, useContext } from "react";
import { Context } from "../index";
import { getBasket } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";

const Basket = observer(() => {
    const { device } = useContext(Context);

    const basketId = localStorage.getItem("userId");

    useEffect(() => {
        getBasket(basketId).then((data) => device.setBaskets(data));
    }, []);

    let prices = 0;
    {
        device.basket.map((price) => (prices += Number(price.device.price)));
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-3 text-center">
            {device.basket.map((product) => (
                <div className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
                    <div className="d-flex w-100">
                        <div className="d-flex flex-row align-items-center justify-content-around w-100">
                            <img
                                src={process.env.REACT_APP_API_URL + product.device.img}
                                width={150}
                            />
                            <h2 className="pl-3">{product.device.name}</h2>
                            <h2
                                className="pl-3"
                                style={{ border: "2px solid #d7d7d7", borderRadius: "40%" }}
                            >
                                {product.device.price} MDL
                            </h2>
                        </div>
                    </div>
                </div>
            ))}
            <div className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2">
                <h3 className="pl-2">
                    <span className="font-weight-light pl-2">Итого: {prices} MDL</span>
                </h3>
            </div>
        </div>
    );
});

export default Basket;
