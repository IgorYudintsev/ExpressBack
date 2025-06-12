"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)()); // Включаем CORS, чтобы разрешить запросы с других доменов
app.get("/", (req, res) => {
    res.json({ message: "Hello TypeScript!" }); // JSON, а не просто текст
});
// const todos=[{title:'Express'},{title:'React'}]
const books = [{ volume: 'Book1' }, { volume: 'Book2' }];
const todos = [
    {
        todolistId: 1,
        filter: 'toLearn',
        title: "What to learn",
        tasks: [
            { taskId: 1, title: "HTML&CSS", isDone: true, priority: "high" },
            { taskId: 2, title: "JS", isDone: false, priority: "medium" }
        ],
    },
    {
        todolistId: 2,
        filter: 'toDo',
        title: "What to do",
        tasks: [
            { taskId: 1, title: "HTML&CSS2", isDone: false, priority: "low" },
            { taskId: 2, title: "JS2", isDone: true, priority: "high" }
        ],
    }
];
app.get("/todos", (req, res) => {
    res.send(todos);
});
app.get("/todos/:filterValue", (req, res) => {
    const filterValue = req.params.filterValue;
    const filteredTodos = todos.filter(todo => todo.filter === filterValue);
    if (filterValue === "toLearn" || filterValue === "toDo") {
        res.send(filteredTodos);
    }
    else {
        res.status(404).send("Not Found. Invalid filter. Use 'toLearn' or 'toDo");
    }
});
app.get("/books", (req, res) => {
    res.send(books);
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
