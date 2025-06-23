import { todosCollection} from "../index";
import {ObjectId, WithId} from "mongodb";
import {v1} from "uuid";
import {ensureTaskExists, ensureTodoExists} from "../midlewares/ensureItems";

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
    async getTodos():Promise<TodoType[]>{
        return await todosCollection.find().toArray();
    },

    async postTodo( title: string):Promise<TodoType> {
        const newTodoList:TodoType = {
            title: title.trim(),
            tasks: []
        };
        const result = await todosCollection.insertOne(newTodoList);
        const insertedTodo = await todosCollection.findOne({ _id: result.insertedId });
        if (!insertedTodo) {
            throw new Error("Ошибка: документ не найден после вставки");
        }
        return insertedTodo;
       },

    async postTask(todolistId:string, title: string,priority:"high" | "medium" | "low"):Promise<TasksType | null>  {
        await  ensureTodoExists(todolistId)

        const newTask: TasksType = {
            taskId: v1(),
            title: title.trim(),
            isDone: false,
            priority: priority as "high" | "medium" | "low"
        };

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

    async deleteTodo( id: string):Promise<TodoType[] | undefined> {
        const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            throw new Error("Todo Not Found");
        }
        return await todosCollection.find().toArray();
          },

   async deleteTask(todolistID: string, taskID: string):Promise<TodoType[]> {
       await ensureTaskExists(todolistID, taskID);

       await todosCollection.updateOne(
           { _id: new ObjectId(todolistID) },
           { $pull: { tasks: { taskId: taskID } } }
       );
       return await todosCollection.find().toArray();
    },

    async putTodo(todolistID: string,title: string):Promise<TodoType[] | undefined>{
        const trimmedTitle = title.trim();

        const result = await todosCollection.updateOne(
            { _id: new ObjectId(todolistID) },
            { $set: { title: trimmedTitle } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Task Not Found");
        }
        return await todosCollection.find().toArray();
    },

 async  putTask(todolistID: string, taskID: string, title: string) {
        await ensureTaskExists(todolistID, taskID);

        const trimmedTitle = title.trim();

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