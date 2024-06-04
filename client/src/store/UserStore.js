import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._userId = 0;
        this._isAuth = false;
        this._isAdmin = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setUserId(userId) {
        this._userId = userId;
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }
    setIsAdmin(bool) {
        this._isAdmin = bool;
    }

    get isAuth() {
        return this._isAuth;
    }
    get isAdmin() {
        return this._isAdmin;
    }
    get user() {
        return this._user;
    }
    get userId() {
        return this._userId;
    }
}
