import express,{Request,Response} from 'express';
const app = express();
const port = 3000;
import cors from "cors";
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

const books=[{volume:'Book1'},{volume:'Book2'}]
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

app.get("/books", (req: Request, res: Response) => {
    res.send(books);
});

app.post("/books", (req: Request, res: Response) => {
    const { volume } = req.body as { volume: string }; // Приведение типа
    const newBook = { volume };
    books.push(newBook);
    res.status(201).json(newBook);
});


app.get("/todos", (req: Request, res: Response) => {
    if (!todos || todos.length === 0) {
        res.status(404).send("No todos found");
    }else{
        res.send(todos);
    }
});






app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
