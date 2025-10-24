import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.get("/", userController.getUsers);
router.get("/email/:email", userController.getUserByEmail);
router.post("/", userController.createUser);

router.post("/login", userController.authUser);

export default router;