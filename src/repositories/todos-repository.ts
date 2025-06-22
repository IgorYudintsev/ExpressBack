import {booksCollection, todosCollection} from "../index";
import {ObjectId, WithId} from "mongodb";
import {v1} from "uuid";
import {booksRepository} from "./books-repository";

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
            throw new Error("Тудулист с таким _id не найдена");
        }
        return await todosCollection.find().toArray();
          },

   async deleteTask(todolistID: string, taskID: string):Promise<TodoType[]> {
       const todo = await todosCollection.findOne({ _id: new ObjectId(todolistID) });

       if (!todo) {
           throw new Error("❌ Todo list not found");
       }

       const taskExists = todo.tasks.some(task => task.taskId === taskID);
       if (!taskExists) {
           throw new Error("❌ Task not found in specified todo list");
       }

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
            throw new Error("❌ Todo list not found");
        }
        return await todosCollection.find().toArray();
    },

 // async  putTask(todolistID: string, taskID: string, title: string) {
 //        const currentTodo:ObjectType | undefined = todos.find(el => el.todolistId === Number(todolistID));
 //        if (!currentTodo) {
 //            throw new Error("Todo Not Found");
 //        }
 //
 //        const currentTask:TasksType | undefined  = currentTodo.tasks.find(el => el.taskId === Number(taskID));
 //        if (!currentTask) {
 //            throw new Error("Task Not Found");
 //        }
 //
 //        currentTask.title = title.trim();
 //        return todos;
 //    }
}