"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_repository_1 = require("../repositories/books-repository");
const express_validator_1 = require("express-validator");
exports.booksRouter = express_1.default.Router();
exports.booksRouter.get("/", (req, res) => {
    const foundBooks = books_repository_1.booksRepository.getBooks();
    res.send(foundBooks);
});
exports.booksRouter.post("/", (0, express_validator_1.body)('volume').isLength({ min: 3, max: 30 }), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: "Invalid volume: min:1, max:30" });
    }
    const { volume } = req.body;
    const newBook = books_repository_1.booksRepository.postBooks(volume);
    res.status(201).json(newBook);
});
exports.booksRouter.delete("/:id", (req, res) => {
    let currentBook = books_repository_1.booksRepository.deleteBooks(req.params.id);
    if (currentBook) {
        res.send(currentBook);
    }
    else {
        res.status(404).json({ message: "Book Not Found" });
    }
});
