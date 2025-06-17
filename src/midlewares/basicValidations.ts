import {body,param} from "express-validator";

export const titleValidation = body('title').trim().isLength({min: 3, max: 30}).withMessage('Title is required:min:1, max:30')
export const idValidation = body('id').trim().isLength({min: 1, max: 999}).withMessage('ID is required')

const validPriorities = ["high", "medium", "low"];
export const priorityValidation = body('priority')
    .optional() // делаем поле необязательным
    .isIn(validPriorities) // проверяем, что значение есть в массиве допустимых
    .withMessage(`Priority must be one of: ${validPriorities.join(', ')}`);