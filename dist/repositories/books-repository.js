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
// import {currentCollection} from "../index";
const mongodb_1 = require("mongodb");
const index_1 = require("../index");
exports.booksRepository = {
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.booksCollection.find().toArray();
        });
    },
    postBooks(volume) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = { volume };
            const result = yield index_1.booksCollection.insertOne(newBook);
            const insertedBook = yield index_1.booksCollection.findOne({ _id: result.insertedId });
            if (!insertedBook) {
                throw new Error("Ошибка: документ не найден после вставки");
            }
            return insertedBook;
        });
    },
    deleteBooks(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.booksCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (result.deletedCount === 0) {
                throw new Error("Книга с таким _id не найдена");
            }
            return yield index_1.booksCollection.find().toArray();
        });
    }
};
