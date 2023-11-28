import React, {ChangeEvent} from "react";
import {FilterValuesType, TasksStateType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoType = {
    title: string
    todoId: string
    tasks: TasksStateType
    filter: FilterValuesType
    removeTask: (todoId: string, id: string) => void
    addTask: (todoId: string, title: string) => void
    changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
    changeFilter: (todoId: string, value: FilterValuesType) => void
    removeTodolist: (todoId: string) => void
    changeTodolistTitle: (todoId: string, title: string) => void
}
export const Todolist = (props: TodoType) => {

    let filteredTasks = props.tasks[props.todoId]
    if (props.filter === "completed") filteredTasks = props.tasks[props.todoId].filter((f) => f.isDone)
    if (props.filter === "active") filteredTasks = props.tasks[props.todoId].filter((f) => !f.isDone)


    const listItems = filteredTasks.map((t) => {
        const removeHandler = () => props.removeTask(props.todoId, t.id)

        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todoId, t.id, e.currentTarget.checked)
        }
        const onChangeSpanTitle = (title: string) => {
            props.changeTaskTitle(props.todoId, t.id, title)
        }

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                {/*<input type="checkbox"*/}
                {/*       checked={t.isDone}*/}
                {/*       onChange={onChangeStatus}*/}
                {/*/>*/}
                <Checkbox defaultChecked
                          color="success"
                          checked={t.isDone}
                          onChange={onChangeStatus}/>

                <EditableSpan title={t.title} onChangeTitle={onChangeSpanTitle}/>
                {/*<button onClick={removeHandler}>X</button>*/}
                <IconButton aria-label="delete" onClick={removeHandler}>
                    <DeleteIcon/>
                </IconButton>
            </li>
        )
    })
    const removeTodolistHandler = () => props.removeTodolist(props.todoId)
    const filterHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(props.todoId, filter)
    const addTaskHandler = (title: string) => {
        props.addTask(props.todoId, title)
    }
    const onChangTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.todoId, title)
    }

    const tasksList = filteredTasks.length
        ? <ul>{listItems}</ul>
        : <span className={"error-message"}>Your tasksList is empty</span>

    // const classNameAll = props.filter === "all" ? "active-filter" : ""
    // const classNameActive = props.filter === "active" ? "active-filter" : ""
    // const classNameCompleted = props.filter === "completed" ? "active-filter" : ""
    const classNameAll = props.filter === "all" ? "outlined" : "contained"
    const classNameActive = props.filter === "active" ? "outlined" : "contained"
    const classNameCompleted = props.filter === "completed" ? "outlined" : "contained"

    const styleButton =
        {
            maxWidth: "100px", maxHeight: "30px",
            minWidth: "30px", minHeight: "30px",
        }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChangeTitle={onChangTodolistTitleHandler}/>
                {/*<button onClick={removeTodolistHandler}>X</button>*/}
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {tasksList}
            <div>
                {/*<button className={classNameAll} onClick={filterHandlerCreator("all")}>All</button>*/}
                {/*<button className={classNameActive} onClick={filterHandlerCreator("active")}>Active</button>*/}
                {/*<button className={classNameCompleted} onClick={filterHandlerCreator("completed")}>Completed</button>*/}
                <Button style={styleButton} variant={classNameAll} color="error"
                        onClick={filterHandlerCreator("all")}>All</Button>

                <Button style={styleButton} variant={classNameActive} color="success"
                        onClick={filterHandlerCreator("active")}>Active</Button>

                <Button style={styleButton} variant={classNameCompleted} color="success"
                        onClick={filterHandlerCreator("completed")}>Completed</Button>
            </div>
        </div>
    )
}
