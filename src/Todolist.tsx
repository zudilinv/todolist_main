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
    filter: FilterValuesType
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const Todolist = (props: TodolistType) => {
    const [inputTitle, setinputTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)


    const listItems = props.tasks.map((t) => {
        const removeHandler = () => props.removeTask(t.id)
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeStatus}
                />
                <span>{t.title}</span>
                <button onClick={removeHandler}>X</button>
            </li>
        )
    })

    const onChangeFilterAll = () => props.changeFilter("all")
    const onChangeFilterActive = () => props.changeFilter("active")
    const onChangeFilterCompleted = () => props.changeFilter("completed")
    const addTaskHandler = () => {
        const trimmedTask = inputTitle.trim()
        if (trimmedTask) {
            props.addTask(inputTitle.trim())
            setinputTitle("")
        } else {
            setError(true)
        }
    }
    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setinputTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            e.shiftKey && addTaskHandler()
        }
    }

    const tasksList = props.tasks.length
        ? <ul>{listItems}</ul>
            : <span className={"error-message"}>Your tasksList is empty</span>

    const userMessage = error
        ? <span className={"error-message"}>Field is required</span>
            : inputTitle.length < 10
        ? <span className={"message"}>Enter new title</span>
            : <span className={"error-message"}>Your title is too long</span>

    const isBTNDisabled = !inputTitle || inputTitle.length >= 10

    const classNameAll = props.filter === "all" ? "active-filter" : ""
    const classNameActive = props.filter === "active" ? "active-filter" : ""
    const classNameCompleted = props.filter === "completed" ? "active-filter" : ""

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? "error" : ""}
                       value={inputTitle}
                       onChange={onChangeAddTaskHandler}
                       onKeyDown={onKeyDownAddTaskHandler}
                />
                <button disabled={isBTNDisabled}
                        onClick={addTaskHandler}>
                    {"+"}</button>
                <div>
                    {userMessage}
                </div>
            </div>
            {tasksList}
            <div>
                <button className={classNameAll} onClick={onChangeFilterAll}>All</button>
                <button className={classNameActive} onClick={onChangeFilterActive}>Active</button>
                <button className={classNameCompleted} onClick={onChangeFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}