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
const todos_router_1 = require("./routes/todos-router");
app.use(express_1.default.json()); // Добавляем middleware для парсинга JSON тела которое приходит в post
app.use((0, cors_1.default)()); // Включаем CORS, чтобы разрешить запросы с других доменов
app.get("/", (req, res) => {
    res.json({ message: "Hello TypeScript!" }); // JSON, а не просто текст
});
app.use('/books', books_router_1.booksRouter);
app.use('/todos', todos_router_1.todosRouter);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
