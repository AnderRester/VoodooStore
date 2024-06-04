import React, { useContext, useEffect } from "react";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Filters from "../components/Filters";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import ADVLine from "../components/ADVLine";
import CurrencyConverter from "../components/CurrencyConverter";

const Shop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data));
        fetchBrands().then((data) => device.setBrands(data));
        fetchDevices(null, null).then((data) => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
        // fetchOneDevice(id).then(data => device.setBrands(data))
    }, []);

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id).then((data) => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.page, device.selectedType, device.selectedBrand]);

    return (
        <div style={{ minHeight: "100vh" }}>
            <Filters />
            <div className={"d-flex flex-row mt-3 "}>
                <div>
                    <TypeBar />
                    <BrandBar />
                    <CurrencyConverter />
                </div>
                <DeviceList />
            </div>
        </div>
    );
});

export default Shop;
