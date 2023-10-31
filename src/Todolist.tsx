import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType)=> void
    addTask: (title: string) => void
}
export const Todolist = (props: TodolistType) => {
const [inputTitle, setinputTitle] = useState<string>("")

    const listItems = props.tasks.map((t)=>{
        const removeHandler = ()=>{
            return props.removeTask(t.id)
        }
        return(
            <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeHandler}>X</button>
            </li>
        )
    })

    const onChangeFilterAll = ()=> props.changeFilter("all")
    const onChangeFilterActive = ()=> props.changeFilter("active")
    const onChangeFilterCompleted = ()=> props.changeFilter("completed")
    const addTaskHandler = () => {
        props.addTask(inputTitle)
        setinputTitle("")
    }
    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setinputTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.keyCode === 13 && e.ctrlKey && addTaskHandler()
    }

    const tasksList = props.tasks.length
        ? <ul>{listItems}</ul>
        : <span style = {{color: "red"}}>Your tasksList is empty</span>

    const isBTNDisabled = !inputTitle || inputTitle.length >= 5

    const spanTitle = inputTitle.length < 5
        ? <span style = {{color: "green"}}>"Enter new title"</span>
        : <span style = {{color: "red"}}>"Your title is too long"</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputTitle}
                       onChange={onChangeAddTaskHandler}
                       onKeyDown={onKeyDownAddTaskHandler}
                />
                <button disabled = {isBTNDisabled}
                    onClick = {addTaskHandler}>+</button>
                <div>
                    <span>{spanTitle}</span>
                </div>
            </div>
                {tasksList}
            <div>
                <button onClick={onChangeFilterAll}>All</button>
                <button onClick={onChangeFilterActive}>Active</button>
                <button onClick={onChangeFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}