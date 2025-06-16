"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const cors_1 = __importDefault(require("cors"));
const books_router_1 = require("./routes/books-router");
app.use(express_1.default.json()); // Добавляем middleware для парсинга JSON тела которое приходит в post
app.use((0, cors_1.default)()); // Включаем CORS, чтобы разрешить запросы с других доменов
// const books = [{
//     id:1,
//     volume: 'Book1'
// }, {
//     id:2,
//     volume: 'Book2'
// }]
const todos = [
    {
        todolistId: 1,
        title: "Monday",
        tasks: [
            { taskId: 1, title: "HTML&CSS", isDone: true, priority: "high" },
            { taskId: 2, title: "JS", isDone: false, priority: "medium" }
        ],
    },
    {
        todolistId: 2,
        title: "Tuesday",
        tasks: [
            { taskId: 1, title: "HTML&CSS2", isDone: false, priority: "low" },
            { taskId: 2, title: "JS2", isDone: true, priority: "high" }
        ],
    }
];
app.get("/", (req, res) => {
    res.json({ message: "Hello TypeScript!" }); // JSON, а не просто текст
});
app.use('/books', books_router_1.booksRouter);
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
app.get("/todos", (req, res) => {
    if (!todos || todos.length === 0) {
        res.status(404).send("No todos found");
    }
    else {
        res.send(todos);
    }
});
app.post("/todos", (req, res) => {
    try {
        // Валидация
        if (!req.body) {
            res.status(400).json({ error: "Request body is missing" });
            return;
        }
        const { title } = req.body;
        if (!(title === null || title === void 0 ? void 0 : title.trim())) {
            res.status(400).json({ error: "Title is required" });
            return;
        }
        // Создание нового списка
        const newTodoList = {
            todolistId: 3,
            title: title.trim(),
            tasks: []
        };
        todos.push(newTodoList);
        res.status(201).json(newTodoList);
    }
    catch (error) {
        console.error("Error creating todo list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post("/task", (req, res) => {
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
        if (!(title === null || title === void 0 ? void 0 : title.trim())) {
            res.status(400).json({ error: "Title is required" });
            return;
        }
        const validPriorities = ["high", "medium", "low"];
        if (priority && !validPriorities.includes(priority)) {
            res.status(400).json({ error: "Invalid priority value" });
            return;
        }
        // Создание нового списка
        const newTask = {
            taskId: 3,
            title: title.trim(),
            isDone: false,
            priority: priority
        };
        // Находим нужный todolist и добавляем задачу
        const todoList = todos.find(el => el.todolistId === Number(todolistId));
        if (!todoList) {
            res.status(404).json({ error: "Todolist not found" });
            return;
        }
        todoList.tasks.push(newTask);
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error("Error creating todo list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.delete("/todos/:id", (req, res) => {
    let currentTodo = todos.find(el => el.todolistId === Number(req.params.id));
    if (currentTodo) {
        todos.splice(todos.indexOf(currentTodo), 1);
        res.send(todos);
    }
    else {
        res.status(404).json({ message: "Todo Not Found" });
    }
});
app.delete("/todos/:todolistID/tasks/:taskID", (req, res) => {
    let currentTodo = todos.find(el => el.todolistId === Number(req.params.todolistID));
    if (currentTodo) {
        let currentTask = currentTodo.tasks.find(el => el.taskId === Number(req.params.taskID));
        if (currentTask) {
            currentTodo.tasks.splice(currentTodo.tasks.indexOf(currentTask), 1);
            res.send(todos);
        }
        else {
            res.status(404).json({ message: "Task Not Found" });
        }
    }
    else {
        res.status(404).json({ message: "Todo Not Found" });
    }
});
app.put("/todos/:id", (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({ error: "Request body is missing" });
            return;
        }
        const { title } = req.body;
        if (!(title === null || title === void 0 ? void 0 : title.trim())) {
            res.status(400).json({ error: "Title is required" });
            return;
        }
        const currentTodo = todos.find(el => el.todolistId === Number(req.params.id));
        if (currentTodo) {
            currentTodo.title = title.trim();
            res.status(200).json(todos);
        }
        else {
            res.status(404).json({ message: "Todo Not Found" });
        }
    }
    catch (error) {
        console.error("Error updating todo list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.put("/todos/:todolistID/tasks/:taskID", (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({ error: "Request body is missing" });
            return;
        }
        const { title } = req.body;
        if (!(title === null || title === void 0 ? void 0 : title.trim())) {
            res.status(400).json({ error: "Title is required" });
            return;
        }
        const currentTodo = todos.find(el => el.todolistId === Number(req.params.todolistID));
        if (currentTodo) {
            let currentTask = currentTodo.tasks.find(el => el.taskId === Number(req.params.taskID));
            if (currentTask) {
                currentTask.title = title.trim();
                res.status(200).json(todos);
            }
            else {
                res.status(404).json({ message: "Task Not Found" });
            }
        }
        else {
            res.status(404).json({ message: "Todo Not Found" });
        }
    }
    catch (error) {
        console.error("Error updating todo list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
