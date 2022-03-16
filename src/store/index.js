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
    applyStatus
} from "../services/index.js";

class Mobx {
    tomato = 0
    tomatoList = []
    goodList = []
    room = {}
    member = []
    listEmpty = true
    vip = false
    admin = false
    userId = 0
    applyData = {}
    apply = false

    constructor() {
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
            this.vip = vip;
            this.admin = admin;
            this.userId = id;

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
            this.vip = vip;
            this.admin = admin;
            this.userId = id;
            
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

    buyGoodRequest = async(data) => {
        const {
            data: {
                code, errors
            }
        } = await buyGood(data);
        
        if (code) {
            message.success("购买成功");
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
                console.log(data[0])
                const { member } = data[0];
                this.room = data[0];
                console.log(this.room)
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
            if (data.length === 0) {
                this.apply = false;
            } else {
                const { activate } = data;

                if (activate) {
                    this.apply = false;
                } else {
                    this.apply = true;
                    this.applyData = data;
                }
            }
        } else {
            message.error(errors);
        }
    }
}

const myStore = new Mobx();
export default myStore;
