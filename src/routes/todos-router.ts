import express, {Request, Response} from "express";
import { body, validationResult } from 'express-validator';
import {todosRepository} from "../repositories/todos-repository";
import {textfieldValidationMidleware} from "../midlewares/textfieldValidationMidleware";
import {idValidation, priorityValidation, titleValidation} from "../midlewares/basicValidations";
export const todosRouter = express.Router();


todosRouter.get("/", (req: Request, res: Response) => {
    const foundTodos = todosRepository.getTodos()
    if (!foundTodos || foundTodos.length === 0) {
        res.status(404).send("No todos found");
    } else {
        res.send(foundTodos);
    }
});

todosRouter.post("/",
    titleValidation,
    textfieldValidationMidleware,
    (req: Request, res: Response) => {
        const {title} = req.body;
        const postedTodos = todosRepository.postTodo(title)
        if(postedTodos){
            res.status(201).json(postedTodos);
        }else{
            res.status(500).json({error: "Internal server error"});
        }
    });

todosRouter.post("/task",
    titleValidation,
    idValidation,
    priorityValidation,
    textfieldValidationMidleware,
    (req: Request, res: Response) => {
        const {id, title, priority = "medium"} = req.body;

        try {
            const postedTask = todosRepository.postTask(id, title, priority)
            if (!postedTask) {
                res.status(404).json({error: "Todolist not found"});
                return;
            }
            res.status(201).json(postedTask);

        } catch (error) {
            console.error("Error creating todo list:", error);
            res.status(500).json({error: "Internal server error"});
        }
    });

todosRouter.delete("/:id", (req: Request, res: Response) => {
    const todosAfterRemove = todosRepository.deleteTodo(req.params.id)
    if (todosAfterRemove) {
        res.send(todosAfterRemove);
    } else {
        res.status(404).json({message: "Todo Not Found"});
    }
});


// todosRouter.delete("/:todolistID/tasks/:taskID", (req: Request, res: Response) => {
//     let currentTodo=todos.find(el => el.todolistId === Number(req.params.todolistID));
//     if(currentTodo){
//         let currentTask=currentTodo.tasks.find(el=>el.taskId===Number(req.params.taskID))
//         if(currentTask){
//             currentTodo.tasks.splice( currentTodo.tasks.indexOf(currentTask),1);
//             res.send(todos);
//         }else{
//             res.status(404).json({message: "Task Not Found"});
//         }
//     }else{
//         res.status(404).json({message: "Todo Not Found"});
//     }
// });
//
// todosRouter.put("/:id", (req: Request, res: Response) => {
//     try {
//         if (!req.body) {
//             res.status(400).json({error: "Request body is missing"});
//             return;
//         }
//
//         const {title} = req.body;
//
//         if (!title?.trim()) {
//             res.status(400).json({error: "Title is required"});
//             return;
//         }
//
//         const currentTodo = todos.find(el => el.todolistId === Number(req.params.id));
//
//         if (currentTodo) {
//             currentTodo.title = title.trim();
//             res.status(200).json(todos);
//         } else {
//             res.status(404).json({message: "Todo Not Found"});
//         }
//
//     } catch (error) {
//         console.error("Error updating todo list:", error);
//         res.status(500).json({error: "Internal server error"});
//     }
// });
//
// todosRouter.put("/:todolistID/tasks/:taskID", (req: Request, res: Response) => {
//     try {
//         if (!req.body) {
//             res.status(400).json({error: "Request body is missing"});
//             return;
//         }
//
//         const {title} = req.body;
//         if (!title?.trim()) {
//             res.status(400).json({error: "Title is required"});
//             return;
//         }
//         const currentTodo = todos.find(el => el.todolistId === Number(req.params.todolistID));
//
//         if (currentTodo) {
//             let currentTask = currentTodo.tasks.find(el => el.taskId === Number(req.params.taskID))
//             if (currentTask) {
//                 currentTask.title = title.trim();
//                 res.status(200).json(todos);
//             } else {
//                 res.status(404).json({message: "Task Not Found"});
//             }
//         } else {
//             res.status(404).json({message: "Todo Not Found"});
//         }
//
//     } catch (error) {
//         console.error("Error updating todo list:", error);
//         res.status(500).json({error: "Internal server error"});
//     }
// });
