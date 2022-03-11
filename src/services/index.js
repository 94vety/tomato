import request from "../utils/request";

export const login = data => request.post("/login/", data);

export const register = data => request.post("/register/", data);

export const getTomatos = () => request.get("/reports/");

export const addReport = data => request.post("/add-report/", data);

export const getGoodList = () => request.get("/goods/");

export const buyGood = data => request.post("/record/", data);

export const adminSelfRoom = () => request.get("/groups/");

export const placeSelfRoom = () => request.get("/my-group/");

export const joinRoom = data => request.post("/user/group/", data);

export const addCom = data => request.post("/setgoods/", data);

export const modifyCom = (data, id) => request.put(`/setgoods/${id}/`, data);

export const deleteCom = id => request.delete(`/setgoods/${id}/`);

export const modifyRoomName = (data, id) => request.put(`/groups/${id}/`, data);

export const deleteUser = data => request.delete("/allow/", data);

export const deleteGroup = id => request.delete(`/groups/${id}/`);

export const quitGroup = data => request.delete("/user/group/", data);

export const createGroup = data => request.post("/groups/", data);


