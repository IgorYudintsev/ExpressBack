import express,{Request,Response} from 'express';
const app = express();
const port = 3000;
import cors from "cors";
import {v1} from "uuid";

app.use(cors()); // Включаем CORS, чтобы разрешить запросы с других доменов

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello TypeScript!" }); // JSON, а не просто текст
});

// const todos=[{title:'Express'},{title:'React'}]
const books=[{volume:'Book1'},{volume:'Book2'}]

type ObjectType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TasksType>
}
export type TasksType = {
    taskId: number
    title: string
    priority:"high" | "medium"| "low"
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";


const todos:ObjectType[]=[
    {
        title: "What to learn",
        filter: "all",
        tasks: [
            {taskId: 1, title: "HTML&CSS", isDone: true,priority:"high"},
            {taskId: 2, title: "JS", isDone: false,priority:"medium"}
        ],
    },
    {
        title: "What to do",
        filter: "all",
        tasks: [
            {taskId: 1, title: "HTML&CSS2", isDone: false,priority:"low"},
            {taskId: 2, title: "JS2", isDone: true,priority:"high"}
        ],
    }
]

app.get("/todos", (req: Request, res: Response) => {
    res.send(todos);
});

app.get("/todos/active", (req: Request, res: Response) => {
    const activeTodos = todos.map(todo => ({
        ...todo,
        tasks: todo.tasks.filter(task => !task.isDone)
    }));
    res.send(activeTodos);
});

app.get("/todos/completed", (req, res) => {
    const completedTodos = todos.map(todo => ({
        ...todo,
        tasks: todo.tasks.filter(task => task.isDone)
    }));
    res.send(completedTodos);
});






app.get("/books", (req: Request, res: Response) => {
    res.send(books);
});




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
