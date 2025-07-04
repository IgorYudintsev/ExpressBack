import express, {Request, Response} from "express";
import {PaginationResult, todosRepository, TodoType} from "../repositories/todos-repository";
import {validationMidleware} from "../midlewares/validationMidleware";
import {idValidation, priorityValidation, titleValidation} from "../midlewares/basicValidations";
import {switchErrors} from "../midlewares/switchErrors";
import {todosService} from "../domain/todos-service";
export const todosRouter = express.Router();


todosRouter.get("/", async(req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const foundTodos:PaginationResult<TodoType> = await todosService.getTodos(page,pageSize)
    if (!foundTodos.items || foundTodos.items.length === 0) {
        res.status(404).send("No todos found");
    } else {
        res.send(foundTodos);
    }
});

todosRouter.post("/",
    titleValidation,
    validationMidleware,
    async(req: Request, res: Response) => {
        const {title} = req.body;
        const postedTodos:TodoType =await todosService.postTodo(title)
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
    validationMidleware,
    async(req: Request, res: Response) => {
        const {id, title, priority = "medium"} = req.body;

        try {
            const postedTask = await todosService.postTask(id, title, priority)
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
    const { deleted } =await todosService.deleteTodo(req.params.id)
    if (deleted) {
        res.send({ deleted: true });
    } else {
        res.status(404).json({message: "Todo Not Found"});
    }
});

todosRouter.delete("/:todolistID/tasks/:taskID",
    async (req: Request, res: Response) => {
    try {
        const {todolistID, taskID} = req.params;
        const { deleted } =await todosService.deleteTask(todolistID, taskID)
        res.send(deleted);
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
            const updatedTodo:TodoType | undefined  = await todosService.putTodo(req.params.id, title)
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
    validationMidleware,
  async  (req: Request, res: Response) => {
        try {
            const {todolistID, taskID} = req.params;
            const {title} = req.body;

            const updatedTodo:TodoType | undefined  =await todosService.putTask(todolistID, taskID, title);
            res.status(200).json(updatedTodo);

        } catch (error) {
            if (error instanceof Error) {
                switchErrors(res,error.message)
                return
            } else {
                console.error("Unknown error updating task:", error);
                res.status(500).json({error: "Internal server error"});
            }
        }
    });




