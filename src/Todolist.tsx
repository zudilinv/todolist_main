import React from "react";
import {FilterValueType} from "./App";

export type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistType) => {

    const taskMap = props.tasks.map((t) => {
        const removeTaskHandler =()=> {
           props.removeTask(t.id)
        }

        return (
            <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={removeTaskHandler}>X</button>
        </li>)
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskMap}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter("all")}}>All</button>
                <button onClick={()=>{props.changeFilter("active")}}>Active</button>
                <button onClick={()=>{props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}