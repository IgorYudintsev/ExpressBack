"use strict";
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
        return books;
    },
    postBooks(volume) {
        const newBook = { id: 3, volume };
        books.push(newBook);
        return newBook;
    },
};
