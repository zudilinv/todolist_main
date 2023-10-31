import React from "react";

export type TodolistType = {
    title: string
    tasks: TaskType[]
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistType) => {

    const taskMap = props.tasks.map((task) => {
        return <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
        </li>
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}