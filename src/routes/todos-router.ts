import express, {Request, Response} from "express";
import {ObjectType, todosRepository} from "../repositories/todos-repository";
import {textfieldValidationMidleware} from "../midlewares/textfieldValidationMidleware";
import {idValidation, priorityValidation, titleValidation} from "../midlewares/basicValidations";
import {switchErrors} from "../midlewares/switchErrors";
export const todosRouter = express.Router();


todosRouter.get("/", async(req: Request, res: Response) => {
    const foundTodos:ObjectType[] = await todosRepository.getTodos()
    if (!foundTodos || foundTodos.length === 0) {
        res.status(404).send("No todos found");
    } else {
        res.send(foundTodos);
    }
});

todosRouter.post("/",
    titleValidation,
    textfieldValidationMidleware,
    async(req: Request, res: Response) => {
        const {title} = req.body;
        const postedTodos =await todosRepository.postTodo(title)
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
    async(req: Request, res: Response) => {
        const {id, title, priority = "medium"} = req.body;

        try {
            const postedTask = await todosRepository.postTask(id, title, priority)
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

todosRouter.delete("/:id",
    async(req: Request, res: Response) => {
    const todosAfterRemove =await todosRepository.deleteTodo(req.params.id)
    if (todosAfterRemove) {
        res.send(todosAfterRemove);
    } else {
        res.status(404).json({message: "Todo Not Found"});
    }
});

todosRouter.delete("/:todolistID/tasks/:taskID",
    async (req: Request, res: Response) => {
    try {
        const {todolistID, taskID} = req.params;
        const result = await todosRepository.deleteTask(todolistID, taskID);
        res.send(result);
    } catch (error) {
        if (!(error instanceof Error)) {
            res.status(500).json({message: "Unknown error occurred"});
            return;
        }
        switchErrors(res,error.message)
    }
});

todosRouter.put("/:id",
    titleValidation,
    async (req: Request, res: Response) => {
        try {
            const {title} = req.body;
            const updatedTodo = await todosRepository.putTodo(req.params.id, title)
            if (updatedTodo) {
                res.status(200).json(updatedTodo);
            } else {
                res.status(404).json({message: "Todo Not Found"});
            }
        } catch (error) {
            res.status(500).json({error: "Internal server error"});
        }
    });

todosRouter.put("/:todolistID/tasks/:taskID",
    titleValidation,
    textfieldValidationMidleware,
  async  (req: Request, res: Response) => {
        try {
            const {todolistID, taskID} = req.params;
            const {title} = req.body;

            const updatedTodos =await todosRepository.putTask(todolistID, taskID, title);
            res.status(200).json(updatedTodos);

        } catch (error) {
            if (error instanceof Error) {
                switchErrors(res,error.message)
            } else {
                console.error("Unknown error updating task:", error);
                res.status(500).json({error: "Internal server error"});
            }
        }
    });




