import { todosCollection} from "../index";
import {ObjectId,} from "mongodb";
import {v1} from "uuid";
import {PaginationResult, TasksType, todosRepository, TodoType} from "../repositories/todos-repository";




export const todosService={
    async getTodos(page: number, pageSize: number):Promise<PaginationResult<TodoType>>{
        return todosRepository.getTodosMongoDB(page,pageSize)
    },

    async postTodo( title: string):Promise<TodoType> {
        const newTodoList:TodoType = {
            title: title.trim(),
            tasks: []
        };
        return todosRepository.postTodoMongoDB(newTodoList)
    },

    async postTask(todolistId:string, title: string,priority:"high" | "medium" | "low"):Promise<TasksType | null>  {
            const newTask: TasksType = {
            taskId: v1(),
            title: title.trim(),
            isDone: false,
            priority: priority as "high" | "medium" | "low"
        };
        return todosRepository.postTaskMongoDB(todolistId,newTask)
     },

    async deleteTodo( id: string):Promise<{deleted: true| false}> {
        return todosRepository.deleteTodoMongoDB(id)
    },

    async deleteTask(todolistID: string, taskID: string):Promise<{deleted: true| false}> {
        return todosRepository.deleteTaskMongoDB(todolistID,taskID)
    },

    async putTodo(todolistID: string,title: string):Promise<TodoType| undefined>{
        const trimmedTitle = title.trim();
        return todosRepository.putTodoMongoDB(todolistID,trimmedTitle)
         },

    async  putTask(todolistID: string, taskID: string, title: string):Promise<TodoType| undefined> {
         const trimmedTitle = title.trim();
        return todosRepository.putTaskMongoDB(todolistID,taskID,trimmedTitle)
    }
}