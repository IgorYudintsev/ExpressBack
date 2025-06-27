import {ObjectId} from "mongodb";
import {booksCollection} from "../index";
import {getPagination, getPaginationInfo} from "../utils/paginator";

export type PaginationResult<T> = {
    items: T[];
    pagination: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
    };
};

export type BookType={
    _id?: ObjectId,
    volume: string
}


export const booksRepository={

    async getBooksMongoDB(
        order: 'asc' | 'desc' = 'asc',
        page = 1,
        pageSize = 10
    ): Promise<{ items: BookType[]; pagination: ReturnType<typeof getPaginationInfo> }> {
        const sortDirection = order === 'asc' ? 1 : -1;
        const { skip, limit } = getPagination({ page, pageSize });

        const pipeline = [
            {
                $addFields: {
                    volumeNumber: {
                        $toInt: { $arrayElemAt: [{ $split: ["$volume", "-"] }, 1] }
                    }
                }
            },
            { $sort: { volumeNumber: sortDirection } },
            {
                $facet: {
                    items: [
                        { $skip: skip },
                        { $limit: limit },
                        { $project: { _id: 1, volume: 1 } }
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ];

        const result = await booksCollection.aggregate(pipeline).toArray();
        const items = result[0]?.items ?? [];
        const totalItems = result[0]?.totalCount[0]?.count ?? 0;
        const pagination = getPaginationInfo(totalItems, page, pageSize);

        return { items, pagination };
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