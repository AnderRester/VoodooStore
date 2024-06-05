import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (idnp, email, password, phone) => {
    const { data } = await $host.post("api/user/registration", { idnp, email, password, phone });
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    console.log(data);
    return jwt_decode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post("api/user/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    return jwt_decode(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};

export const updateUserData = async (email, password, phone) => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    const { data } = await $authHost.post("api/user/update", { userId, email, password, phone });
    return data;
};

export const createAccount = async (unit) => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    const { data } = await $authHost.post("api/account/create", { userId, unit });
    return data;
};

export const transferP2P = async (toAccountId, amount) => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    const { data } = await $authHost.post("api/service/transfer", { userId, toAccountId, amount });
    return data;
};

export const getAccountData = async () => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    console.log(userId);
    const { data } = await $authHost.get("api/account/getInfo", userId);
    console.log(data);
    return data;
};
