export type ObjectType = {
    todolistId:number
    title: string
    tasks: Array<TasksType>
}
export type TasksType = {
    taskId: number
    title: string
    priority:"high" | "medium"| "low"
    isDone: boolean
}

 const todos:ObjectType[]=[
    {
        todolistId:1,
        title: "Monday",
        tasks: [
            {taskId: 1, title: "HTML&CSS", isDone: true,priority:"high"},
            {taskId: 2, title: "JS", isDone: false,priority:"medium"}
        ],
    },
    {
        todolistId:2,
        title: "Tuesday",
        tasks: [
            {taskId: 1, title: "HTML&CSS2", isDone: false,priority:"low"},
            {taskId: 2, title: "JS2", isDone: true,priority:"high"}
        ],
    }
]

export const todosRepository={
    async getTodos():Promise<ObjectType[]>{
        return todos;
    },

    async postTodo( title: string):Promise<ObjectType[]> {
        const newTodoList:ObjectType = {
            todolistId: 3,
            title: title.trim(),
            tasks: []
        };
        todos.push(newTodoList);
        return todos
    },
    async postTask(todolistId:string, title: string,priority:"high" | "medium" | "low"):Promise<TasksType | null>  {
        const newTask: TasksType = {
            taskId: 3,
            title: title.trim(),
            isDone: false,
            priority: priority as "high" | "medium" | "low"
        };

        const currentTodoList = todos.find(el => el.todolistId === Number(todolistId));
        if (currentTodoList) {
            currentTodoList.tasks.push(newTask);
            return newTask;
        }else{
            return null
        }
    },
    async deleteTodo( id: string):Promise<ObjectType[] | undefined> {
        let currentTodo:ObjectType| undefined  = todos.find(el => el.todolistId === Number(id));
        if (currentTodo) {
            todos.splice(todos.indexOf(currentTodo), 1);
            return todos
        }
    },
   async deleteTask(todolistID: string, taskID: string):Promise<ObjectType[]> {
        let currentTodo:ObjectType| undefined  = todos.find(el => el.todolistId === Number(todolistID));
        if (!currentTodo) {
            throw new Error("Todo Not Found");
        }

        let currentTask = currentTodo.tasks.find(el => el.taskId === Number(taskID));
        if (!currentTask) {
            throw new Error("Task Not Found");
        }

        currentTodo.tasks.splice(currentTodo.tasks.indexOf(currentTask), 1);
        return todos;
    },
    async putTodo(todolistID: string,title: string):Promise<ObjectType[] | undefined>{
        const currentTodo:ObjectType | undefined = todos.find(el => el.todolistId === Number(todolistID));
        if (currentTodo) {
            currentTodo.title = title.trim();
            return todos
        }
    },
 async  putTask(todolistID: string, taskID: string, title: string) {
        const currentTodo:ObjectType | undefined = todos.find(el => el.todolistId === Number(todolistID));
        if (!currentTodo) {
            throw new Error("Todo Not Found");
        }

        const currentTask:TasksType | undefined  = currentTodo.tasks.find(el => el.taskId === Number(taskID));
        if (!currentTask) {
            throw new Error("Task Not Found");
        }

        currentTask.title = title.trim();
        return todos;
    }
}