import request from "../utils/request";

export const login = data => request.post("/login/", data);

export const register = data => request.post("/register/", data);

export const getTomatos = () => request.get("/reports/");

export const addReport = data => request.post("/add-report/", data);

export const getGoodList = () => request.get("/goods/");

export const buyGood = data => request.post("/record/", data);

export const placeSelfRoom = () => request.get("/my-group/");

export const joinRoom = data => request.post("/user/group/", data);

export const addCom = data => request.post("/setgoods/", data);

export const modifyCom = (data, id) => request.put(`/setgoods/${id}/`, data);

export const deleteCom = id => request.delete(`/setgoods/${id}/`);

export const modifyRoomName = (data, id) => request.put(`/groups/${id}/`, data);

export const deleteUser = data => request.delete("/allow/", data);

export const cancelApply = () => request.delete("/allow/");

export const deleteGroup = id => request.delete(`/groups/${id}/`);

export const quitGroup = () => request.delete("/user/group/");

export const applyStatus = () => request.get("/user/group/");

export const createGroup = data => request.post("/groups/", data);

export const adoptUser = data => request.put("/allow/", data);



