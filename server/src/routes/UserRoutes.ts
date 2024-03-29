import express from "express"
import { login, signUp, getAuthenticatedUser, logout, putPropfilePic } from "../controller/UserController"


const userRouter = express.Router();


userRouter.get("/getUser", getAuthenticatedUser)

userRouter.post("/signUp", signUp);

userRouter.post("/login", login);

userRouter.post("/logout", logout)

userRouter.patch("/updateProfile", putPropfilePic)





export default userRouter;