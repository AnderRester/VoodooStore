import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const { device } = useContext(Context);

    return (
        <div className={"d-flex flex-row flex-wrap justify-content-center align-items-start"}>
            {device.devices.map((device) => (
                <DeviceItem key={device.id} device={device}></DeviceItem>
            ))}
        </div>
    );
});

export default DeviceList;
