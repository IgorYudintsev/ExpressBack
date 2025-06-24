import {ObjectId} from "mongodb";
import {booksCollection} from "../index";

export type BookType={
    _id?: ObjectId,
    volume: string
}

export const booksRepository={
      async  getBooksMongoDB():Promise<BookType[]> {
        return await  booksCollection.find().toArray();
    },

    async postBooksMongoDB(newBook:BookType):Promise<BookType>  {
          const result = await booksCollection.insertOne(newBook);
        const insertedBook = await booksCollection.findOne({ _id: result.insertedId });
        if (!insertedBook) {
            throw new Error("Ошибка: документ не найден после вставки");
        }
        return insertedBook;
    },

   async deleteBooksMongoDB( id: string):Promise<BookType[] |undefined>  {
       const result = await booksCollection.deleteOne({ _id: new ObjectId(id) });
       if (result.deletedCount === 0) {
           throw new Error("Книга с таким _id не найдена");
       }
       return await booksCollection.find().toArray();
   }
}