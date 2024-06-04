import React, { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context);
    return (
        <ListGroup className="text-center sidebar_filter">
            <span className="ms-3 my-3">Бренд</span>
            {device.brands.map((brand) => (
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    key={brand.id}
                    className={"ms-3"}
                    onClick={() => device.setSelectedBrand(brand)}
                    active={brand.id === device.selectedBrand.id}
                >
                    {brand.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default BrandBar;
