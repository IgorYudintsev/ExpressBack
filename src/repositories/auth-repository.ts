import {ObjectId} from "mongodb";
import {usersCollection} from "../index";


export type UserType = {
    _id?: ObjectId;
    login: string;
    passwordHash: string;
};


export const authRepository= {
    async findByLogin(login: string): Promise<UserType | null> {
        return await usersCollection.findOne({login});
    },


    async createUser(user: UserType): Promise<UserType> {
        const result = await usersCollection.insertOne(user);
        return {_id: result.insertedId, ...user};
    }
}