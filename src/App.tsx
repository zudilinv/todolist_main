import React, {useReducer, useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./styles/ButtonAppBar";
import {Paper} from "@mui/material";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";


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

    const [todolist, dispatchTodolist] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to bay", filter: "all"},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Fish", isDone: false},
        ]
    })

    const removeTask = (todoId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todoId, taskId))
    }
    const addTask = (todoId: string, title: string) => {
        dispatchTasks(addTaskAC(todoId, title))
    }
    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todoId, taskId, isDone))
    }
    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todoId, taskId, title))
    }
    const changeFilter = (todoId: string, filter: FilterValuesType) => {
        dispatchTodolist(changeTodolistFilterAC(todoId, filter))
    }
    const removeTodolist = (todoId: string) => {
        const action = removeTodolistAC(todoId)
        dispatchTodolist(action)
        dispatchTasks(action)
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolist(action)
        dispatchTasks(action)
    }
    const changeTodolistTitle = (todoId: string, title: string) => {
        dispatchTodolist(changeTodolistTitleAC(todoId, title))
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