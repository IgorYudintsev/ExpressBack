import express, {Request, Response} from "express";
import {booksRepository, BookType} from "../repositories/books-repository";
import { body, validationResult } from 'express-validator';

export const booksRouter = express.Router();


booksRouter.get("/", async (req: Request, res: Response) => {
  const  foundBooks:BookType[]= await booksRepository.getBooks()
    res.send(foundBooks);
});


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



