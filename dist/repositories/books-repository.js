"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRepository = void 0;
const mongodb_1 = require("mongodb");
const index_1 = require("../index");
exports.booksRepository = {
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
    getBooksMongoDB() {
        return __awaiter(this, arguments, void 0, function* (order = 'asc') {
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
            return yield index_1.booksCollection.aggregate(pipeline).toArray();
        });
    },
    postBooksMongoDB(newBook) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.booksCollection.insertOne(newBook);
            const insertedBook = yield index_1.booksCollection.findOne({ _id: result.insertedId });
            if (!insertedBook) {
                throw new Error("Ошибка: документ не найден после вставки");
            }
            return insertedBook;
        });
    },
    deleteBooksMongoDB(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.booksCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (result.deletedCount === 0) {
                throw new Error("Книга с таким _id не найдена");
            }
            return yield index_1.booksCollection.find().toArray();
        });
    }
};
