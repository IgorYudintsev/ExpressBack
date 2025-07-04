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
const express_validator_1 = require("express-validator");
const books_service_1 = require("../domain/books-service");
const authMiddleware_1 = require("../midlewares/authMiddleware");
exports.booksRouter = express_1.default.Router();
exports.booksRouter.get("/", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.query.order === 'desc' ? 'desc' : 'asc';
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const foundBooks = yield books_service_1.booksService.getBooks(order, page, pageSize);
    res.send(foundBooks);
}));
exports.booksRouter.post("/", (0, express_validator_1.body)('volume').isLength({ min: 3, max: 30 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: "Invalid volume: min:1, max:30" });
    }
    const { volume } = req.body;
    const newBook = yield books_service_1.booksService.postBooks(volume);
    res.status(201).json(newBook);
}));
exports.booksRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleted } = yield books_service_1.booksService.deleteBooks(req.params.id);
    if (deleted) {
        res.status(200).json({ deleted: true });
    }
    else {
        res.status(404).json({ message: "Книга не найдена" });
    }
}));
