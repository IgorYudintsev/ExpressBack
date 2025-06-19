import express,{Request,Response} from 'express';
const app = express();
const port = 3000;
import cors from "cors";
import {booksRouter} from "./routes/books-router";
import {todosRouter} from "./routes/todos-router";
import {booksDb, client} from "./db/booksDb";
import {BookType} from "./repositories/books-repository";
app.use(express.json());// Добавляем middleware для парсинга JSON тела которое приходит в post
app.use(cors()); // Включаем CORS, чтобы разрешить запросы с других доменов


app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello TypeScript!" }); // JSON, а не просто текст
});

app.use('/books', booksRouter)
app.use('/todos', todosRouter)

const currentDB=client.db('kiberRus')
export  const currentCollection=currentDB.collection<BookType>('books')



const startApp = async () => {
    await booksDb();
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`);
    });
};

startApp();


// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
