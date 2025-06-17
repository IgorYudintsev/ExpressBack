const books = [{
    id:1,
    volume: 'Book1'
}, {
    id:2,
    volume: 'Book2'
}]

export const booksRepository={
    getBooks() {
        return books;
    },

    postBooks( volume: string) {
        const newBook = {id: 3, volume};
        books.push(newBook);
        return newBook;
    },
}