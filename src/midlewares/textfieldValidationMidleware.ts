import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const textfieldValidationMidleware=(req: Request, res: Response,next:NextFunction)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({codeResult:0, errors: errors.array() });
    }else{
        next()//если ошибки нет-продолжаем цепочку дальше
    }
}
