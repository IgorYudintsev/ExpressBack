import express,{Request,Response} from 'express';
const app = express();
const port = 3000;
import cors from "cors";
import {debuglog} from "node:util";
import {booksRouter} from "./routes/books-router";
app.use(express.json());// Добавляем middleware для парсинга JSON тела которое приходит в post
app.use(cors()); // Включаем CORS, чтобы разрешить запросы с других доменов

type ObjectType = {
    todolistId:number
    title: string
    tasks: Array<TasksType>
}
export type TasksType = {
    taskId: number
    title: string
    priority:"high" | "medium"| "low"
    isDone: boolean
}


// const books = [{
//     id:1,
//     volume: 'Book1'
// }, {
//     id:2,
//     volume: 'Book2'
// }]


const todos:ObjectType[]=[
    {
        todolistId:1,
        title: "Monday",
        tasks: [
            {taskId: 1, title: "HTML&CSS", isDone: true,priority:"high"},
            {taskId: 2, title: "JS", isDone: false,priority:"medium"}
        ],
    },
    {
        todolistId:2,
        title: "Tuesday",
        tasks: [
            {taskId: 1, title: "HTML&CSS2", isDone: false,priority:"low"},
            {taskId: 2, title: "JS2", isDone: true,priority:"high"}
        ],
    }
]

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello TypeScript!" }); // JSON, а не просто текст
});

app.use('/books', booksRouter)

//
// app.get("/books", (req: Request, res: Response) => {
//     res.send(books);
// });
//
// app.post("/books", (req: Request, res: Response) => {
//     const { volume } = req.body as { volume: string }; // Приведение типа
//     const newBook = { volume,id:3 };
//     books.push(newBook);
//     res.status(201).json(newBook);
// });
//
//
// app.delete("/books/:id", (req: Request, res: Response) => {
//     let currentBook = books.find(el => el.id === Number(req.params.id));
//     if (currentBook) {
//         books.splice(books.indexOf(currentBook), 1);
//         res.send(books);
//     } else {
//         res.status(404).json({message: "Book Not Found"});
//     }
// });
//





app.get("/todos", (req: Request, res: Response) => {
    if (!todos || todos.length === 0) {
        res.status(404).send("No todos found");
    }else{
        res.send(todos);
    }
});

app.post("/todos", (req: Request, res: Response) => {
    try {
        // Валидация
        if (!req.body) {
            res.status(400).json({ error: "Request body is missing" });
            return;
        }

        const { title } = req.body;

        if (!title?.trim() ) {
            res.status(400).json({ error: "Title is required" });
            return;
        }

        // Создание нового списка
        const newTodoList: ObjectType = {
            todolistId: 3,
            title: title.trim(),
            tasks: []
        };

        todos.push(newTodoList);
        res.status(201).json(newTodoList);

    } catch (error) {
        console.error("Error creating todo list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/task", (req: Request, res: Response) => {
    try {
           if (!req.body) {
            res.status(400).json({ error: "Request body is missing" });
            return;
        }

        const { todolistId, title, priority = "medium" } = req.body;


        if (!todolistId) {
            res.status(400).json({ error: "Todolist ID is required" });
            return;
        }

        if (!title?.trim() ) {
            res.status(400).json({ error: "Title is required" });
            return;
        }

        const validPriorities = ["high", "medium", "low"];
        if (priority && !validPriorities.includes(priority)) {
            res.status(400).json({ error: "Invalid priority value" });
            return;
        }

        // Создание нового списка
        const newTask: TasksType = {
            taskId: 3,
            title: title.trim(),
            isDone: false,
            priority: priority as "high" | "medium" | "low"
        };

        // Находим нужный todolist и добавляем задачу
        const todoList = todos.find(el => el.todolistId === Number(todolistId));

        if (!todoList) {
            res.status(404).json({ error: "Todolist not found" });
            return;
        }

        todoList.tasks.push(newTask);
        res.status(201).json(newTask);

    } catch (error) {
        console.error("Error creating todo list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.delete("/todos/:id", (req: Request, res: Response) => {
    let currentTodo = todos.find(el => el.todolistId === Number(req.params.id));
    if (currentTodo) {
        todos.splice(todos.indexOf(currentTodo), 1);
        res.send(todos);
    } else {
        res.status(404).json({message: "Todo Not Found"});
    }
});

app.delete("/todos/:todolistID/tasks/:taskID", (req: Request, res: Response) => {
    let currentTodo=todos.find(el => el.todolistId === Number(req.params.todolistID));
    if(currentTodo){
        let currentTask=currentTodo.tasks.find(el=>el.taskId===Number(req.params.taskID))
        if(currentTask){
            currentTodo.tasks.splice( currentTodo.tasks.indexOf(currentTask),1);
            res.send(todos);
        }else{
            res.status(404).json({message: "Task Not Found"});
        }
    }else{
        res.status(404).json({message: "Todo Not Found"});
    }
});

app.put("/todos/:id", (req: Request, res: Response) => {
    try {
        if (!req.body) {
            res.status(400).json({error: "Request body is missing"});
            return;
        }

        const {title} = req.body;

        if (!title?.trim()) {
            res.status(400).json({error: "Title is required"});
            return;
        }

        const currentTodo = todos.find(el => el.todolistId === Number(req.params.id));

        if (currentTodo) {
            currentTodo.title = title.trim();
            res.status(200).json(todos);
        } else {
            res.status(404).json({message: "Todo Not Found"});
        }

    } catch (error) {
        console.error("Error updating todo list:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

app.put("/todos/:todolistID/tasks/:taskID", (req: Request, res: Response) => {
    try {
        if (!req.body) {
            res.status(400).json({error: "Request body is missing"});
            return;
        }

        const {title} = req.body;
        if (!title?.trim()) {
            res.status(400).json({error: "Title is required"});
            return;
        }
        const currentTodo = todos.find(el => el.todolistId === Number(req.params.todolistID));

        if (currentTodo) {
            let currentTask = currentTodo.tasks.find(el => el.taskId === Number(req.params.taskID))
            if (currentTask) {
                currentTask.title = title.trim();
                res.status(200).json(todos);
            } else {
                res.status(404).json({message: "Task Not Found"});
            }
        } else {
            res.status(404).json({message: "Todo Not Found"});
        }

    } catch (error) {
        console.error("Error updating todo list:", error);
        res.status(500).json({error: "Internal server error"});
    }
});





app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
