import express, {Request, Response} from "express";
import { body, validationResult } from 'express-validator';
import {todosRepository} from "../repositories/todos-repository";
export const todosRouter = express.Router();

// type ObjectType = {
//     todolistId:number
//     title: string
//     tasks: Array<TasksType>
// }
// export type TasksType = {
//     taskId: number
//     title: string
//     priority:"high" | "medium"| "low"
//     isDone: boolean
// }
//
// const todos:ObjectType[]=[
//     {
//         todolistId:1,
//         title: "Monday",
//         tasks: [
//             {taskId: 1, title: "HTML&CSS", isDone: true,priority:"high"},
//             {taskId: 2, title: "JS", isDone: false,priority:"medium"}
//         ],
//     },
//     {
//         todolistId:2,
//         title: "Tuesday",
//         tasks: [
//             {taskId: 1, title: "HTML&CSS2", isDone: false,priority:"low"},
//             {taskId: 2, title: "JS2", isDone: true,priority:"high"}
//         ],
//     }
// ]




// todosRouter.get("/", (req: Request, res: Response) => {
//     if (!todos || todos.length === 0) {
//         res.status(404).send("No todos found");
//     }else{
//         res.send(todos);
//     }
// });

todosRouter.get("/", (req: Request, res: Response) => {
    const foundTodos = todosRepository.getTodos()
    if (!foundTodos || foundTodos.length === 0) {
        res.status(404).send("No todos found");
    } else {
        res.send(foundTodos);
    }
});


// todosRouter.post("/", (req: Request, res: Response) => {
//     try {
//         // Валидация
//         if (!req.body) {
//             res.status(400).json({ error: "Request body is missing" });
//             return;
//         }
//
//         const { title } = req.body;
//
//         if (!title?.trim() ) {
//             res.status(400).json({ error: "Title is required" });
//             return;
//         }
//
//         // Создание нового списка
//         const newTodoList: ObjectType = {
//             todolistId: 3,
//             title: title.trim(),
//             tasks: []
//         };
//
//         todos.push(newTodoList);
//         res.status(201).json(newTodoList);
//
//     } catch (error) {
//         console.error("Error creating todo list:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });
//
//
// todosRouter.post("/task", (req: Request, res: Response) => {
//     try {
//         if (!req.body) {
//             res.status(400).json({ error: "Request body is missing" });
//             return;
//         }
//
//         const { todolistId, title, priority = "medium" } = req.body;
//
//
//         if (!todolistId) {
//             res.status(400).json({ error: "Todolist ID is required" });
//             return;
//         }
//
//         if (!title?.trim() ) {
//             res.status(400).json({ error: "Title is required" });
//             return;
//         }
//
//         const validPriorities = ["high", "medium", "low"];
//         if (priority && !validPriorities.includes(priority)) {
//             res.status(400).json({ error: "Invalid priority value" });
//             return;
//         }
//
//         // Создание нового списка
//         const newTask: TasksType = {
//             taskId: 3,
//             title: title.trim(),
//             isDone: false,
//             priority: priority as "high" | "medium" | "low"
//         };
//
//         // Находим нужный todolist и добавляем задачу
//         const todoList = todos.find(el => el.todolistId === Number(todolistId));
//
//         if (!todoList) {
//             res.status(404).json({ error: "Todolist not found" });
//             return;
//         }
//
//         todoList.tasks.push(newTask);
//         res.status(201).json(newTask);
//
//     } catch (error) {
//         console.error("Error creating todo list:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });
//
//
// todosRouter.delete("/:id", (req: Request, res: Response) => {
//     let currentTodo = todos.find(el => el.todolistId === Number(req.params.id));
//     if (currentTodo) {
//         todos.splice(todos.indexOf(currentTodo), 1);
//         res.send(todos);
//     } else {
//         res.status(404).json({message: "Todo Not Found"});
//     }
// });
//
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
