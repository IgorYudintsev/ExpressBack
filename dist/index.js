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
app.get("/todos", (req, res) => {
    if (!todos || todos.length === 0) {
        res.status(404).send("No todos found");
    }
    else {
        res.send(todos);
    }
});
app.get("/books", (req, res) => {
    res.send(books);
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
