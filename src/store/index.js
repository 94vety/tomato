import { makeAutoObservable } from "mobx";
import { message } from "antd";

import {
    login,
    register,
    getTomatos
} from "../services/index.js";

class Mobx {
    tomato = 0
    tomatoList = []

    constructor() {
        makeAutoObservable(this);
    }

    loginRequest = async(data) => {
        const {
            data: {
                code, errors,
                data: {
                    token, tomato,
                    vip, admin, email
                }
            }
        } = await login(data);

        if (code) {
            this.tomato = tomato;
            localStorage.setItem("token", token);
            localStorage.setItem("vip", vip);
            localStorage.setItem("admin", admin);
            localStorage.setItem("username", data.username);
            localStorage.setItem("email", email);
            message.success("登录成功");
            return true;
        } else {
            message.error(errors);
            return false;
        }
    }

    registerRequest = async(data) => {
        const {
            data: {
                code, errors,
                data: {
                    token, tomato,
                    vip, admin, email
                }
            }
        } = await register(data);

        if (code) {
            this.tomato = tomato;
            localStorage.setItem("token", token);
            localStorage.setItem("vip", vip);
            localStorage.setItem("admin", admin);
            localStorage.setItem("username", data.username);
            localStorage.setItem("email", email);
            message.success("注册成功自动登录");
            return true;
        } else {
            message.error(errors);
            return false;
        }
    }

    getTomatosRequest = async() => {
        const {
            data: {
                code, errors,
                data
            }
        } = await getTomatos();

        const { user_report } = data[0];

        if (code) {
            this.tomatoList = user_report;
        } else {
            message.error(errors);
        }
    }
}

const myStore = new Mobx();
export default myStore;
