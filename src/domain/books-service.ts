import {booksRepository, BookType} from "../repositories/books-repository";



export const booksService={
    async  getBooks():Promise<BookType[]> {
        return  booksRepository.getBooksMongoDB()
    },

    async postBooks( volume: string):Promise<BookType>  {
        const newBook:BookType = {volume};
        return booksRepository.postBooksMongoDB(newBook)
    },

    async deleteBooks( id: string):Promise<BookType[] |undefined>  {
        return booksRepository.deleteBooksMongoDB(id)
    }
}