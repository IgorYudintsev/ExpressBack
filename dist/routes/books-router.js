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
exports.booksRouter = express_1.default.Router();
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBooks = yield books_repository_1.booksRepository.getBooks();
    res.send(foundBooks);
}));
// booksRouter.post("/",
//     body('volume').isLength({min:3, max:30}),
//     async (req: Request, res: Response)=> {
//
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             res.status(400).json({ error: "Invalid volume: min:1, max:30" });
//         }
//
//         const { volume} = req.body as {  volume: string };
//         const newBook: BookType=await booksRepository.postBooks(volume)
//         res.status(201).json(newBook);
//     });
//
//
// booksRouter.delete("/:id", async(req: Request, res: Response) => {
//     let currentBook =await booksRepository.deleteBooks(req.params.id)
//     if (currentBook) {
//         res.send(currentBook);
//     } else {
//         res.status(404).json({message: "Book Not Found"});
//     }
// });
