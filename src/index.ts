import express,{Request,Response} from 'express';
const app = express();
const port = 3000;
import cors from "cors";
import {booksRouter} from "./routes/books-router";
import {todosRouter} from "./routes/todos-router";
import {authRouter} from "./routes/auth-router";
import {BookType} from "./repositories/books-repository";
import {TodoType} from "./repositories/todos-repository";
import {client, connectToDb} from "./db/mongoDB";


import {UserType} from "./repositories/auth-repository"; // если ты завёл отдельный репозиторий
app.use(express.json());// Добавляем middleware для парсинга JSON тела которое приходит в post
app.use(cors()); // Включаем CORS, чтобы разрешить запросы с других доменов


app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello TypeScript!" }); // JSON, а не просто текст
});

app.use('/books', booksRouter)
app.use('/todos', todosRouter)
app.use('/auth', authRouter)

const currentDB=client.db('kiberRus')
export  const booksCollection=currentDB.collection<BookType>('books')
export const todosCollection = currentDB.collection<TodoType>('todos');
 export const usersCollection = currentDB.collection<UserType>('Users');

const startApp = async () => {
    await connectToDb(); // Просто один вызов
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`);
    });
};


startApp();

