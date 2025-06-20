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
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_repository_1 = require("../repositories/books-repository");
const express_validator_1 = require("express-validator");
exports.booksRouter = express_1.default.Router();
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBooks = yield books_repository_1.booksRepository.getBooks();
    res.send(foundBooks);
}));
exports.booksRouter.post("/", (0, express_validator_1.body)('volume').isLength({ min: 3, max: 30 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: "Invalid volume: min:1, max:30" });
    }
    const { volume } = req.body;
    const newBook = yield books_repository_1.booksRepository.postBooks(volume);
    res.status(201).json(newBook);
}));
exports.booksRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let currentBook = yield books_repository_1.booksRepository.deleteBooks(req.params.id);
    if (currentBook) {
        res.send(currentBook);
    }
    else {
        res.status(404).json({ message: "Book Not Found" });
    }
}));
