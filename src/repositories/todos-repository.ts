type ObjectType = {
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
    getTodos(){
        return todos;
    },
    postTodo( title: string) {
        const newTodoList: ObjectType = {
            todolistId: 3,
            title: title.trim(),
            tasks: []
        };
        todos.push(newTodoList);
        return todos
    },
    postTask(todolistId:string, title: string,priority:"high" | "medium" | "low") {
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
    deleteTodo( id: string) {
        let currentTodo = todos.find(el => el.todolistId === Number(id));
        if (currentTodo) {
            todos.splice(todos.indexOf(currentTodo), 1);
            return todos
        }
    },

}