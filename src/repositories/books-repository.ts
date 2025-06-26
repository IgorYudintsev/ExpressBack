import {ObjectId} from "mongodb";
import {booksCollection} from "../index";

export type BookType={
    _id?: ObjectId,
    volume: string
}

export const booksRepository={

    // async  getBooksMongoDB():Promise<BookType[]> {
    //           return await  booksCollection.find().toArray();
    // },


    //   async  getBooksMongoDB(order: 'asc' | 'desc' = 'asc'):Promise<BookType[]> {
    //       const books = await booksCollection.find().toArray();
    //       const sorted = books.sort((a, b) => {
    //           const getNumber = (v: string) => parseInt(v.replace(/[^\d]/g, '')) || 0;
    //           return order === 'asc'
    //               ? getNumber(a.volume) - getNumber(b.volume)
    //               : getNumber(b.volume) - getNumber(a.volume);
    //       });
    //       return sorted;
    // },

        async getBooksMongoDB(order: 'asc' | 'desc' = 'asc'): Promise<BookType[]> {
            const sortDirection = order === 'asc' ? 1 : -1;

            //Создаём новое поле volumeNumber, делим строку "Book-11" на массив ["Book", "11"]
            const pipeline = [
                {
                    $addFields: {
                        volumeNumber: {
                            $toInt: {
                                $arrayElemAt: [
                                    { $split: ["$volume", "-"] },
                                    1
                                ]
                            }
                        }
                    }
                },

                // Сортируем документы по новому числовому полю volumeNumber в нужном порядке (asc или desc).
                {
                    $sort: { volumeNumber: sortDirection }
                },
                // Очищаем финальный результат, удаляя volumeNumber, так как оно использовалось только для сортировки.
                {
                    $project: {
                        _id: 1,
                        volume: 1
                    }
                }
            ];

            // 👇 Приводим результат к типу BookType[]
            return await booksCollection.aggregate(pipeline).toArray() as BookType[];
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