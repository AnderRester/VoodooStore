import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import CurrencyStore from "./store/CurrencyStore";
import AccountStore from "./store/AccountStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Context.Provider
        value={{
            user: new UserStore(),
            account: new AccountStore(),
            currency: new CurrencyStore(),
        }}>
        <App />
    </Context.Provider>
);
