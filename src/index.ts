import express,{Request,Response} from 'express';
const app = express();
const port = 3000;
import cors from "cors";

app.use(cors()); // Включаем CORS, чтобы разрешить запросы с других доменов

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello TypeScript!" }); // JSON, а не просто текст
});

const books=[{volume:'Book1'},{volume:'Book2'}]

type ObjectType = {
    todolistId:number
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

export type FilterValuesType = "toLearn" | "toDo"
export type KeyFilterType="active" | "completed"

const todos:ObjectType[]=[
    {
        todolistId:1,
        filter:'toLearn',
        title: "What to learn",
            tasks: [
            {taskId: 1, title: "HTML&CSS", isDone: true,priority:"high"},
            {taskId: 2, title: "JS", isDone: false,priority:"medium"}
        ],
    },
    {
        todolistId:2,
        filter:'toDo',
        title: "What to do",
        tasks: [
            {taskId: 1, title: "HTML&CSS2", isDone: false,priority:"low"},
            {taskId: 2, title: "JS2", isDone: true,priority:"high"}
        ],
    }
]

// app.get("/todos", (req: Request, res: Response) => {
//     res.send(todos);
// });


app.get("/todos", (req: Request, res: Response) => {
    const keyFilter = req.query.keyFilter as KeyFilterType | undefined;

    if (!keyFilter) {
        res.send(todos);
        return;
    }

    if (keyFilter !== "active" && keyFilter !== "completed" && keyFilter !== "all") {
        res.status(400).send("Invalid filter. Use 'all', 'active' or 'completed'");
        return;
    }

    const filteredTodos = todos.map(todo => ({
        ...todo,
        tasks: todo.tasks.filter(task =>
            keyFilter === "active" ? !task.isDone :
                keyFilter === "completed" ? task.isDone :
                    true
        )
    }));

    res.send(filteredTodos);
});



app.get("/todos/:filterValue", (req: Request, res: Response) => {
    const filterValue=req.params.filterValue as FilterValuesType

    const filteredTodos = todos.filter(todo => todo.filter === filterValue);

    if (filterValue === "toLearn" || filterValue === "toDo") {
        res.send(filteredTodos);
    } else {
        res.status(404).send("Not Found. Invalid filter. Use 'toLearn' or 'toDo");
    }
});



app.get("/books", (req: Request, res: Response) => {
    res.send(books);
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
