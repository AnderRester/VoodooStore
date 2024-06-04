import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
    const { device } = useContext(Context);
    return (
        <ListGroup className="text-center sidebar_filter">
            <span className="ms-3 my-3">Тип одежды</span>
            {device.types.map((type) => (
                <ListGroup.Item
                    className={"ms-3"}
                    style={{ cursor: "pointer" }}
                    active={type.id === device.selectedType.id}
                    key={type.id}
                    onClick={() => device.setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default TypeBar;
