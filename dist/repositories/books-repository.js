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
const books = [{
        id: 1,
        volume: 'Book1'
    }, {
        id: 2,
        volume: 'Book2'
    }];
exports.booksRepository = {
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return books;
        });
    },
    postBooks(volume) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = { id: 3, volume };
            books.push(newBook);
            return newBook;
        });
    },
    deleteBooks(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentBook = books.find(el => el.id === Number(id));
            if (currentBook) {
                books.splice(books.indexOf(currentBook), 1);
                return books;
            }
        });
    }
};
