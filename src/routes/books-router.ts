import express, {Request, Response} from "express";
import {booksRepository} from "../repositories/books-repository";

export const booksRouter = express.Router();


booksRouter.get("/", (req: Request, res: Response) => {
  const  foundBooks=booksRepository.getBooks()
    res.send(foundBooks);
});


// booksRouter.post("/", (req: Request, res: Response) => {
//     const { volume } = req.body as { volume: string }; // Приведение типа
//     const newBook = { volume,id:3 };
//     books.push(newBook);
//     res.status(201).json(newBook);
// });
//
//
// booksRouter.delete("/:id", (req: Request, res: Response) => {
//     let currentBook = books.find(el => el.id === Number(req.params.id));
//     if (currentBook) {
//         books.splice(books.indexOf(currentBook), 1);
//         res.send(books);
//     } else {
//         res.status(404).json({message: "Book Not Found"});
//     }
// });

