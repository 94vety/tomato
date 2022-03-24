import { makeAutoObservable } from "mobx";
import { message } from "antd";

import {
    login,
    register,
    getTomatos,
    addReport,
    getGoodList,
    buyGood,
    placeSelfRoom,
    joinRoom,
    addCom,
    modifyCom,
    deleteCom,
    modifyRoomName,
    deleteUser,
    deleteGroup,
    quitGroup,
    createGroup,
    adoptUser,
    applyStatus,
    getRecords
} from "../services/index.js";

class Mobx {
    constructor() {
        this.tomato = 0
        this.tomatoList = []
        this.goodList = []
        this.room = {}
        this.member = []
        this.listEmpty = true
        this.vip = false
        this.admin = false
        this.applyData = {}
        this.apply = false
        this.records = []

        makeAutoObservable(this);
    }

    loginRequest = async(data) => {
        const {
            data: {
                code, errors,
                data: {
                    token, tomato, id,
                    vip, admin, email
                }
            }
        } = await login(data);

        if (code) {
            this.tomato = tomato;

            localStorage.setItem("userId", id);
            localStorage.setItem("vip", vip);
            localStorage.setItem("admin", admin);
            localStorage.setItem("token", token);
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
                    token, tomato, id,
                    vip, admin, email
                }
            }
        } = await register(data);

        if (code) {
            this.tomato = tomato;
            
            localStorage.setItem("userId", id);
            localStorage.setItem("vip", vip);
            localStorage.setItem("admin", admin);
            localStorage.setItem("token", token);
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

    addReportRequest = async(data) => {
        const {
            data: {
                code, errors
            }
        } = await addReport(data);

        if (code) {
            message.success("任务记录已上传");
        } else {
            message.error(errors);       
        }
    }

    getGoodListRequest = async() => {
        const {
            data: {
                code, errors,
                data
            }
        } = await getGoodList();

        if (code) {
            this.goodList = data;
        } else {
            message.error(errors);
        }
    }

    buyGoodRequest = async(data, price) => {
        const {
            data: {
                code, errors
            }
        } = await buyGood(data);
        
        if (code) {
            message.success("购买成功");
            
            this.tomato = this.tomato - price;

            this.goodList = this.goodList.map(item => {
                if (item.id === data.goods) {
                    return {
                        ...item,
                        number: item.number - 1
                    }
                } else {
                    return item;
                }
            })
        } else {
            message.error(errors);
        }
    }

    placeSelfRoomRequest = async() => {
        const {
            data: {
                code, data, errors
            }
        } = await placeSelfRoom();
        
        if (code) {
            if (data.length === 0) {
                this.listEmpty = true;
            } else {
                const { member } = data[0];
                console.log(member)
                this.room = data[0];
                this.listEmpty = false;
                
                this.member = member;
            }
        } else {
            message.error(errors);
        }
    }

    joinRoomRequest = async(data) => {
        const {
            data: {
                code, errors,
                data: {
                    info
                }
            }
        } = await joinRoom(data);
        
        if (code) {
            message.success(info);
            this.placeSelfRoomRequest();
        } else {
            message.error(errors);
        }
    }

    addComRequest = async(data) => {
        const {
            data: {
                code, msg, errors
            }
        } = await addCom(data);

        if (code) {
            message.success(msg);
            this.getGoodListRequest();
        } else {
            message.error(errors);
        }
    }

    modifyComRequest = async(data, id) => {
        const {
            data: {
                code, msg, errors
            }
        } = await modifyCom(data, id);

        if (code) {
            message.success(msg);
            this.getGoodListRequest();
        } else {
            message.error(errors);
        }
    }

    deleteCom = async(id) => {
        const {
            data: {
                code, errors, msg
            }
        } = await deleteCom(id);

        if (code) {
            message.success(msg);
            this.getGoodListRequest();
        } else {
            message.error(errors);
        }
    }

    modifyRoomNameRequest = async(data, id) => {
        const {
            data: {
                code, msg, errors
            }
        } = await modifyRoomName(data, id);

        if (code) {
            message.success(msg);
            myStore.placeSelfRoomRequest();
        } else {
            message.error(errors);
        }
    }

    deleteUserRequest = async(data) => {
        const {
            data: {
                code, msg, errors
            }
        } = await deleteUser(data);

        if (code) {
            message.success(msg);
            myStore.placeSelfRoomRequest();
        } else {
            message.error(errors);
        }
    }

    deleteGroupRequest = async(id) => {
        const {
            data: {
                code, errors, msg
            }
        } = await deleteGroup(id);

        if (code) {
            message.success(msg);
            this.placeSelfRoomRequest();
        } else {
            message.error(errors);
        }
    }

    quitGroupRequest = async() => {
        const {
            data: {
                code, errors, msg
            }
        } = await quitGroup();

        if (code) {
            message.success(msg);
            this.placeSelfRoomRequest();
            this.applyStatusRequest();
            this.apply = false;
        } else {
            message.error(errors);
        }
    }

    createGroupRequest = async(data) => {
        const {
            data: {
                code, msg, errors
            }
        } = await createGroup(data);

        if (code) {
            message.success(msg);
            this.placeSelfRoomRequest();
        } else {
            message.error(errors);
        }
    }

    adoptUserRequest = async(data) => {
        const {
            data: {
                code, msg, errors
            }
        } = await adoptUser(data);

        if (code) {
            message.success(msg);
            myStore.placeSelfRoomRequest();
        } else {
            message.error(errors);
        }
    }

    applyStatusRequest = async() => {
        const {
            data: {
                code, errors,
                data
            }
        } = await applyStatus();

        if (code) {
            const { activate, group_name } = data;

            if (activate || !group_name) {
                this.apply = false;
            } else {
                this.apply = true;
                this.applyData = data;
            }
        } else {
            message.error(errors);
        }
    }

    getRecordsRequest = async() => {
        const {
            data: {
                code, data, errors
            }
        } = await getRecords();

        if (code) {
            const {
                user_record
            } = data[0]

            this.records = user_record;
        } else {
            message.error(errors);
        }
    }
}

const myStore = new Mobx();
export default myStore;
