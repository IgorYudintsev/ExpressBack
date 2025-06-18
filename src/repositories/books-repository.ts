export type BookType={
    id:number,
    volume: string
}

const books:BookType[] = [{
    id:1,
    volume: 'Book1'
}, {
    id:2,
    volume: 'Book2'
}]

export const booksRepository={
   async getBooks():Promise<BookType[]> {
        return books;
    },

   async postBooks( volume: string):Promise<BookType>  {
        const newBook:BookType = {id: 3, volume};
        books.push(newBook);
        return newBook;
    },

   async deleteBooks( id: string):Promise<BookType[] |undefined>  {
        const currentBook:BookType | undefined = books.find(el => el.id === Number(id));
        if (currentBook) {
            books.splice(books.indexOf(currentBook), 1);
            return books
        }
    }
}