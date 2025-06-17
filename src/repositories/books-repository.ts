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
    }
}