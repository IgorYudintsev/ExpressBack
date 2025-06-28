import {booksCollection, todosCollection} from "../index";
import {ObjectId, WithId} from "mongodb";
import {v1} from "uuid";
import {ensureTaskExists, ensureTodoExists} from "../midlewares/ensureItems";
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

export type TodoType = {
     _id?: ObjectId,
    title: string
    tasks: Array<TasksType>
}
export type TasksType = {
    taskId: string
    title: string
    priority:"high" | "medium"| "low"
    isDone: boolean
}

export const todosRepository={
    async getTodosMongoDB( page = 1, pageSize = 10):Promise<{ items: TodoType[]; pagination: ReturnType<typeof getPaginationInfo> }>{
        const { skip, limit } = getPagination({ page, pageSize });

        const pipeline = [
            {
                $facet: {
                    items: [
                        { $skip: skip },
                        { $limit: limit },
                        { $project: { _id: 1, title: 1, tasks: 1 } }
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ];
        const result = await todosCollection.aggregate(pipeline).toArray();
        const items = result[0]?.items ?? [];
        const totalItems = result[0]?.totalCount[0]?.count ?? 0;
        const pagination = getPaginationInfo(totalItems, page, pageSize);

        return { items, pagination };
    },

    async postTodoMongoDB( newTodoList:TodoType):Promise<TodoType> {
        const result = await todosCollection.insertOne(newTodoList);
        const insertedTodo = await todosCollection.findOne({ _id: result.insertedId });
        if (!insertedTodo) {
            throw new Error("Ошибка: документ не найден после вставки");
        }
        return insertedTodo;
       },

    async postTaskMongoDB(todolistId:string,newTask: TasksType):Promise<TasksType | null>  {
        await  ensureTodoExists(todolistId)
        const updateResult = await todosCollection.updateOne(
            { _id: new ObjectId(todolistId) },
            { $push: { tasks: newTask } }
        );

        if (updateResult.modifiedCount === 1) {
            return newTask;
        } else {
            return null;
        }
    },

    async deleteTodoMongoDB( id: string):Promise<TodoType[] | undefined> {
        const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            throw new Error("Todo Not Found");
        }
        return await todosCollection.find().toArray();
        },

   async deleteTaskMongoDB(todolistID: string, taskID: string):Promise<TodoType[]> {
       await ensureTaskExists(todolistID, taskID);

       await todosCollection.updateOne(
           { _id: new ObjectId(todolistID) },
           { $pull: { tasks: { taskId: taskID } } }
       );
       return await todosCollection.find().toArray();
    },

    async putTodoMongoDB(todolistID: string,trimmedTitle: string):Promise<TodoType[] | undefined>{
        const result = await todosCollection.updateOne(
            { _id: new ObjectId(todolistID) },
            { $set: { title: trimmedTitle } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Task Not Found");
        }
        return await todosCollection.find().toArray();
    },

 async  putTaskMongoDB(todolistID: string, taskID: string, trimmedTitle: string) {
        await ensureTaskExists(todolistID, taskID);

    await todosCollection.updateOne(
         { _id: new ObjectId(todolistID), "tasks.taskId": taskID },
         {
             $set: {
                 "tasks.$.title": trimmedTitle
             }
         }
     );

     return await todosCollection.find().toArray();
    }
}