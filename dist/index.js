"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json()); // Добавляем middleware для парсинга JSON тела которое приходит в post
app.use((0, cors_1.default)()); // Включаем CORS, чтобы разрешить запросы с других доменов
const books = [{ volume: 'Book1' }, { volume: 'Book2' }];
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
app.get("/books", (req, res) => {
    res.send(books);
});
app.post("/books", (req, res) => {
    const { volume } = req.body; // Приведение типа
    const newBook = { volume };
    books.push(newBook);
    res.status(201).json(newBook);
});
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
        console.log(req.body);
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
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
