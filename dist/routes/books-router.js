"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.booksRouter = express_1.default.Router();
const books = [{
        id: 1,
        volume: 'Book1'
    }, {
        id: 2,
        volume: 'Book2'
    }];
exports.booksRouter.get("/", (req, res) => {
    res.send(books);
});
exports.booksRouter.post("/", (req, res) => {
    const { volume } = req.body; // Приведение типа
    const newBook = { volume, id: 3 };
    books.push(newBook);
    res.status(201).json(newBook);
});
exports.booksRouter.delete("/:id", (req, res) => {
    let currentBook = books.find(el => el.id === Number(req.params.id));
    if (currentBook) {
        books.splice(books.indexOf(currentBook), 1);
        res.send(books);
    }
    else {
        res.status(404).json({ message: "Book Not Found" });
    }
});
