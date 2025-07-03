import {ObjectId} from "mongodb";
import {usersCollection} from "../index";


export type UserType = {
    _id?: ObjectId;
    login: string;
    passwordHash: string;
};


export const authRepository={
    async findByLogin(login: string): Promise<UserType | null> {
        return await usersCollection.findOne({ login });
    },


    async createUser(user: UserType): Promise<UserType> {
        const result = await usersCollection.insertOne(user);
        return { _id: result.insertedId, ...user };
    }



    // async getBooksMongoDB(
    //     order: 'asc' | 'desc' = 'asc',
    //     page = 1,
    //     pageSize = 10
    // ): Promise<{ items: BookType[]; pagination: ReturnType<typeof getPaginationInfo> }> {
    //     const sortDirection = order === 'asc' ? 1 : -1;
    //     const { skip, limit } = getPagination({ page, pageSize });
    //
    //     const pipeline = [
    //         {
    //             $addFields: {
    //                 volumeNumber: {
    //                     $toInt: { $arrayElemAt: [{ $split: ["$volume", "-"] }, 1] }
    //                 }
    //             }
    //         },
    //         { $sort: { volumeNumber: sortDirection } },
    //         {
    //             $facet: {
    //                 items: [
    //                     { $skip: skip },
    //                     { $limit: limit },
    //                     { $project: { _id: 1, volume: 1 } }
    //                 ],
    //                 totalCount: [
    //                     { $count: "count" }
    //                 ]
    //             }
    //         }
    //     ];
    //
    //     const result = await booksCollection.aggregate(pipeline).toArray();
    //     const items = result[0]?.items ?? [];
    //     const totalItems = result[0]?.totalCount[0]?.count ?? 0;
    //     const pagination = getPaginationInfo(totalItems, page, pageSize);
    //
    //     return { items, pagination };
    // },
    //
    // async postBooksMongoDB(newBook:BookType):Promise<BookType>  {
    //     const result = await booksCollection.insertOne(newBook);
    //     const insertedBook = await booksCollection.findOne({ _id: result.insertedId });
    //     if (!insertedBook) {
    //         throw new Error("Ошибка: документ не найден после вставки");
    //     }
    //     return insertedBook;
    // },
    //
    // async deleteBooksMongoDB(id: string): Promise<{ deleted: boolean }> {
    //     const result = await booksCollection.deleteOne({ _id: new ObjectId(id) });
    //     return { deleted: result.deletedCount === 1 };
    // }
}

//-------------------------------------------------------------

// import { usersCollection } from "../index";
// import { UserType } from "../types/user-type";
//
// export const authRepository = {
//     async findByLogin(login: string): Promise<UserType | null> {
//         return await usersCollection.findOne({ login });
//     },
//
//     async createUser(user: UserType): Promise<UserType> {
//         const result = await usersCollection.insertOne(user);
//         return { _id: result.insertedId, ...user };
//     }
// };
