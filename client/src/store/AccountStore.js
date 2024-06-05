import { makeAutoObservable } from "mobx";
export default class AccountStore {
    constructor() {
        this._accounts = [];
        makeAutoObservable(this);
    }

    setAccounts(data) {
        this._accounts = data;
    }

    get accounts() {
        return this._accounts;
    }
}
