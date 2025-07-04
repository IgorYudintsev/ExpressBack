import {body,param} from "express-validator";

export const titleValidation = body('title').trim().isLength({min: 3, max: 30}).withMessage('Title is required:min:1, max:30')
export const idValidation = body('id').trim().isLength({min: 1, max: 999}).withMessage('ID is required')

export const loginValidation=body('login').isLength({min: 3, max: 30}).withMessage("Password must be min: 3, max: 30 characters")
export const passValidation=  body('password').isLength({ min: 3 }).withMessage("Password must be at least 6 characters")


    const validPriorities = ["high", "medium", "low"];
export const priorityValidation = body('priority')
    .optional() // делаем поле необязательным
    .isIn(validPriorities) // проверяем, что значение есть в массиве допустимых
    .withMessage(`Priority must be one of: ${validPriorities.join(', ')}`);