import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./styles/ButtonAppBar";
import {Paper} from "@mui/material";


export  type FilterValuesType = "active" | "completed" | "all"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistId1 = crypto.randomUUID()
    const todolistId2 = crypto.randomUUID()

    const [todolist, setTodolist] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to bay", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: crypto.randomUUID(), title: "HTML", isDone: true},
            {id: crypto.randomUUID(), title: "CSS", isDone: true},
            {id: crypto.randomUUID(), title: "JS/TS", isDone: false},
            {id: crypto.randomUUID(), title: "React", isDone: false},
        ],
        [todolistId2]: [
            {id: crypto.randomUUID(), title: "Milk", isDone: true},
            {id: crypto.randomUUID(), title: "Bread", isDone: true},
            {id: crypto.randomUUID(), title: "Beer", isDone: false},
            {id: crypto.randomUUID(), title: "Fish", isDone: false},
        ]
    })

    const removeTask = (todoId: string, taskId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(t => t.id !== taskId)})
    }
    const addTask = (todoId: string, title: string) => {
        const newTask = {id: crypto.randomUUID(), title, isDone: false}
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
    }
    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, title} : t)})
    }
    const changeFilter = (todoId: string, value: FilterValuesType) => {
        setTodolist(todolist.map(t => t.id === todoId ? {...t, filter: value} : t))
    }
    const removeTodolist = (todoId: string) => {
        setTodolist(todolist.filter(t => t.id !== todoId))
        delete tasks[todoId]
    }
    const addTodolist = (title: string) => {
        const newTodo: TodolistType = {id: crypto.randomUUID(), title, filter: "all"}
        setTodolist([newTodo, ...todolist])
        setTasks({[newTodo.id]: [], ...tasks})
    }
    const changeTodolistTitle = (todoId: string, title: string) => {
        setTodolist(todolist.map(tl=> tl.id === todoId ? {...tl, title} : tl))
    }


    return (
        <div className={"App"}>
            <ButtonAppBar/>
            <div className={"itemApp"}>
                <Paper elevation={4}>
                <div>
                    <h3>Create To Do</h3>
                    <AddItemForm addItem={addTodolist}/>
                </div>
                </Paper>
                {todolist.map(tl => {

                    return (
                        <Paper elevation={4}>
                            <Todolist key={tl.id}
                                      title={tl.title}
                                      todoId={tl.id}
                                      filter={tl.filter}
                                      tasks={tasks}
                                      removeTask={removeTask}
                                      addTask={addTask}
                                      changeTaskStatus={changeTaskStatus}
                                      changeFilter={changeFilter}
                                      removeTodolist={removeTodolist}
                                      changeTaskTitle={changeTaskTitle}
                                      changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>

                    )
                })}
            </div>

        </div>
    );
}

export default App;
//------------------------------------------------------>
// const removeTask = (id: number)=>{        //// Self made filter
//     let res: TaskType[] = []
//     for (let i = 0; i < tasks.length; i++) {
//         if (tasks[i].id !== id) {
//             res.push(tasks[i])
//         }
//     }
//     return res
// }