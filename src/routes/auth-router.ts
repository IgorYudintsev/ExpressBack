import express, {Request, Response} from "express";
import {authService} from "../domain/auth-service";
import {body, validationResult} from "express-validator";

export const authRouter = express.Router();

authRouter.post("/register",
    body('login').isLength({min: 3, max: 30}).withMessage("Password must be min: 3, max: 30 characters"),
    body('password').isLength({ min: 3 }).withMessage("Password must be at least 6 characters"),
    async (req: Request, res: Response) => {
        const {login, password} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() }); // можно вернуть все ошибки
         }

        const user = await authService.register(login, password);

         if(user){
             res.status(201).json({message: "Registered", userId: user!._id});
         }else{
             res.status(409).json({ message: "User already exists" });
         }
      });




// booksRouter.get("/", async (req: Request, res: Response) => {
//     const order = req.query.order === 'desc' ? 'desc' : 'asc';
//     const page = parseInt(req.query.page as string) || 1;
//     const pageSize = parseInt(req.query.pageSize as string) || 10;
//
//    const  foundBooks:PaginationResult<BookType>= await booksService.getBooks(order,page,pageSize)
//     res.send(foundBooks);
// });
//
//
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
//         const newBook: BookType=await booksService.postBooks(volume)
//         res.status(201).json(newBook);
//     });
//
//
// booksRouter.delete("/:id", async (req: Request, res: Response) => {
//     const { deleted } = await booksService.deleteBooks(req.params.id);
//
//     if (deleted) {
//         res.status(200).json({ deleted: true });
//     } else {
//         res.status(404).json({ message: "Книга не найдена" });
//     }
// });


//--------------------------------------------------------------------

// import { Router, Request, Response } from "express";
// import { authService } from "../domain/auth-service";
//
// export const authRouter = Router();
//
// authRouter.post("/register", async (req: Request, res: Response) => {
//     const { login, password } = req.body;
//
//     const user = await authService.register(login, password);
//     if (!user) return res.status(409).json({ message: "User already exists" });
//
//     res.status(201).json({ message: "Registered", userId: user._id });
// });
//
// authRouter.post("/login", async (req: Request, res: Response) => {
//     const { login, password } = req.body;
//
//     const token = await authService.login(login, password);
//     if (!token) return res.status(401).json({ message: "Invalid credentials" });
//
//     res.status(200).json({ accessToken: token });
// });
