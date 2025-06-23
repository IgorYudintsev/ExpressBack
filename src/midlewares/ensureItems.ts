import { ObjectId } from "mongodb";
import { todosCollection } from "../index";
import { TodoType } from "../repositories/todos-repository";

// Проверка, существует ли тудулист
export async function ensureTodoExists(todolistID: string): Promise<TodoType> {
    const todo = await todosCollection.findOne({ _id: new ObjectId(todolistID) });
    if (!todo) {
        throw new Error("Todo Not Found");
    }
    return todo;
}

// Проверка, существует ли task в тудулисте
export async function ensureTaskExists(todolistID: string, taskID: string): Promise<void> {
    const todo = await ensureTodoExists(todolistID);
    const taskExists = todo.tasks.some(task => task.taskId === taskID);
    if (!taskExists) {
        throw new Error("Task Not Found");
    }
}

