import {  Router } from "express";
import { userControllers } from "./user.controller";

const router = Router()

router.post('/users', userControllers.createUserController )
router.get('/users', userControllers.getUserController )
router.get('/users/:id', userControllers.getSengleUserController )
router.put('/users/:id', userControllers.updateUserContoller )
router.delete('/users/:id', userControllers.deleteUserContoller )




export const userRouter = router