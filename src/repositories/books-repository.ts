// import {currentCollection} from "../index";
import {ObjectId} from "mongodb";
import {booksCollection} from "../index";

export type BookType={
    _id?: ObjectId,
    volume: string
}

export const booksRepository={
      async  getBooks():Promise<BookType[]> {
        return await  booksCollection.find().toArray();
    },

    async postBooks( volume: string):Promise<BookType>  {
        const newBook:BookType = {volume};
        const result = await booksCollection.insertOne(newBook);
        const insertedBook = await booksCollection.findOne({ _id: result.insertedId });
        if (!insertedBook) {
            throw new Error("Ошибка: документ не найден после вставки");
        }
        return insertedBook;
    },

   async deleteBooks( id: string):Promise<BookType[] |undefined>  {
       const result = await booksCollection.deleteOne({ _id: new ObjectId(id) });
       if (result.deletedCount === 0) {
           throw new Error("Книга с таким _id не найдена");
       }
       return await booksCollection.find().toArray();
   }
}