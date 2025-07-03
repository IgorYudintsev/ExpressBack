"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersCollection = exports.todosCollection = exports.booksCollection = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const cors_1 = __importDefault(require("cors"));
const books_router_1 = require("./routes/books-router");
const todos_router_1 = require("./routes/todos-router");
const auth_router_1 = require("./routes/auth-router");
const mongoDB_1 = require("./db/mongoDB");
app.use(express_1.default.json()); // Добавляем middleware для парсинга JSON тела которое приходит в post
app.use((0, cors_1.default)()); // Включаем CORS, чтобы разрешить запросы с других доменов
app.get("/", (req, res) => {
    res.json({ message: "Hello TypeScript!" }); // JSON, а не просто текст
});
app.use('/books', books_router_1.booksRouter);
app.use('/todos', todos_router_1.todosRouter);
app.use('/auth', auth_router_1.authRouter);
const currentDB = mongoDB_1.client.db('kiberRus');
exports.booksCollection = currentDB.collection('books');
exports.todosCollection = currentDB.collection('todos');
exports.usersCollection = currentDB.collection('Users');
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoDB_1.connectToDb)(); // Просто один вызов
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`);
    });
});
startApp();
