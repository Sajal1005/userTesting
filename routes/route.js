import express from "express";
import { create, deleteuser, getAll, getOne, update, login } from "../controller/controller.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.get("/login", login);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteuser);

export default route;