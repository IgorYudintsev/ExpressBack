import {currentCollection} from "../index";
import {ObjectId} from "mongodb";

export type BookType={
    _id?: ObjectId,
    volume: string
}

// const books:BookType[] = [{
//     id:1,
//     volume: 'Book1'
// }, {
//     id:2,
//     volume: 'Book2'
// }]

export const booksRepository={
      async  getBooks():Promise<BookType[]> {
        return await  currentCollection.find().toArray();
    },

    // async postBooks( volume: string):Promise<BookType>  {
    //     const newBook:BookType = {id: 3, volume};
    //     books.push(newBook);
    //     return newBook;
    // },

    async postBooks( volume: string):Promise<BookType>  {
        const newBook:BookType = {volume};
        const result = await currentCollection.insertOne(newBook);
        const insertedBook = await currentCollection.findOne({ _id: result.insertedId });
        if (!insertedBook) {
            throw new Error("Ошибка: документ не найден после вставки");
        }
        return insertedBook;

    },
   //
   // async deleteBooks( id: string):Promise<BookType[] |undefined>  {
   //      const currentBook:BookType | undefined = books.find(el => el.id === Number(id));
   //      if (currentBook) {
   //          books.splice(books.indexOf(currentBook), 1);
   //          return books
   //      }
   //  }
}