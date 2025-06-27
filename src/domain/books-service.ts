import {booksRepository, BookType, PaginationResult} from "../repositories/books-repository";



export const booksService={
    async  getBooks(order: 'asc' | 'desc' = 'asc',page: number, pageSize: number):Promise<PaginationResult<BookType>> {
        return  booksRepository.getBooksMongoDB(order,page,pageSize)
    },

    async postBooks( volume: string):Promise<BookType>  {
        const newBook:BookType = {volume};
        return booksRepository.postBooksMongoDB(newBook)
    },

    async deleteBooks( id: string):Promise<{deleted: true| false}>  {
        return booksRepository.deleteBooksMongoDB(id)
    }
}