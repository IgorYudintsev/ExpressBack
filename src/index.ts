import express,{Request,Response} from 'express';
const app = express();
const port = 3000;
import cors from "cors";

app.use(cors()); // Включаем CORS, чтобы разрешить запросы с других доменов

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello TypeScript!" }); // JSON, а не просто текст
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
