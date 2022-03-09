import request from "../utils/request";

export const login = data => request.post("/login/", data);

export const register = data => request.post("/register/", data);

export const getTomatos = () => request.get("/reports/");

export const addReport = data => request.post("/addreport/", data);
