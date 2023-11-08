import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TodoTasksStateType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoType = {
    title: string
    todoId: string
    tasks: TodoTasksStateType
    filter: FilterValuesType
    removeTask: (todoId: string, id: string) => void
    addTask: (todoId: string, title: string) => void
    changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todoId: string, value: FilterValuesType) => void
    removeTodolist: (todoId: string) => void
}
export const Todolist = (props: TodoType) => {
    let filteredTasks = props.tasks[props.todoId]

    if (props.filter === "active") filteredTasks = props.tasks[props.todoId].filter((f) => !f.isDone)
    if (props.filter === "completed") filteredTasks = props.tasks[props.todoId].filter((f) => f.isDone)

    const [inputTitle, setInputTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)


    const listItems = filteredTasks.map((t) => {
        const removeHandler = () => props.removeTask(props.todoId, t.id)
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todoId, t.id, e.currentTarget.checked)
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

    const removeTodolistHandler = () => props.removeTodolist(props.todoId)
    const filterHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(props.todoId, filter)
    const addTaskHandler = () => {
        const trimmedTask = inputTitle.trim()
        if (trimmedTask) {
            props.addTask(props.todoId, inputTitle.trim())
            setInputTitle("")
        } else {
            setError(true)
        }
    }
    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setInputTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            addTaskHandler()
        }
    }

    const tasksList = filteredTasks.length
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
            <h3>
                {props.title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
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
                <button className={classNameAll} onClick={filterHandlerCreator("all")}>All</button>
                <button className={classNameActive} onClick={filterHandlerCreator("active")}>Active</button>
                <button className={classNameCompleted} onClick={filterHandlerCreator("completed")}>Completed</button>
            </div>
        </div>
    )
}
//---------------------------------------------------------------------------------------------------------->
// const onChangeFilterAll = () => props.changeFilter(props.todoId, "all")
// const onChangeFilterActive = () => props.changeFilter(props.todoId, "active")
// const onChangeFilterCompleted = () => props.changeFilter(props.todoId, "completed")