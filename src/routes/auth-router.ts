import express, {Request, Response} from "express";
import {authService} from "../domain/auth-service";
import {body, validationResult} from "express-validator";
import {loginValidation, passValidation} from "../midlewares/basicValidations";
import {validationMidleware} from "../midlewares/validationMidleware";

export const authRouter = express.Router();

authRouter.post("/register",
    loginValidation,
    passValidation,
    async (req: Request, res: Response) => {
        const {login, password} = req.body;

        const user = await authService.register(login, password);

         if(user){
             res.status(201).json({message: "Registered", userId: user!._id});
         }else{
             res.status(409).json({ message: "User already exists" });
         }
      });



authRouter.post("/login",
    loginValidation,
    passValidation,
    validationMidleware,
    async (req: Request, res: Response) => {
    const { login, password } = req.body;

    const token = await authService.login(login, password);

    if(token){
        res.status(200).json({ accessToken: token });
    }else{
         res.status(401).json({ message: "Invalid credentials" })
    }
 });



