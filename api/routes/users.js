import express from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.post("/", addUser)

router.put("/:idLivro", updateUser)

router.delete("/:idLivro", deleteUser)

export default router;
