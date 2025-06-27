import express, {Request, Response} from "express";
import {BookType, PaginationResult} from "../repositories/books-repository";
import { body, validationResult } from 'express-validator';
import {booksService} from "../domain/books-service";

export const booksRouter = express.Router();


booksRouter.get("/", async (req: Request, res: Response) => {
    const order = req.query.order === 'desc' ? 'desc' : 'asc';
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

   const  foundBooks:PaginationResult<BookType>= await booksService.getBooks(order,page,pageSize)
    res.send(foundBooks);
});


booksRouter.post("/",
    body('volume').isLength({min:3, max:30}),
    async (req: Request, res: Response)=> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: "Invalid volume: min:1, max:30" });
        }

        const { volume} = req.body as {  volume: string };
        const newBook: BookType=await booksService.postBooks(volume)
        res.status(201).json(newBook);
    });


// booksRouter.delete("/:id", async(req: Request, res: Response) => {
//     let currentBook =await booksService.deleteBooks(req.params.id)
//     if (currentBook) {
//         res.send(currentBook);
//     } else {
//         res.status(404).json({message: "Book Not Found"});
//     }
// });

booksRouter.delete("/:id", async (req: Request, res: Response) => {
    const { deleted } = await booksService.deleteBooks(req.params.id);

    if (deleted) {
        res.status(200).json({ deleted: true });
    } else {
        res.status(404).json({ message: "Книга не найдена" });
    }
});


