//Endpoints de recursos
import { Router } from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/register", registerUserController);
userRoutes.post("/login", loginUserController);

export { userRoutes };
