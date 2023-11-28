import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType, Todolist} from "../Todolist";
import {
    ADD_TODOLIST,
    ActionTodoType,
    AddTodolistACType,
    REMOVE_TODOLIST,
    RemoveTodolistACType
} from "./todolists-reducer";

export const REMOVE_TASK = "REMOVE-TASK"
export const ADD_TASK = "ADD-TASK"
export const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"
export const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE"

export type ActionTaskType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType
        | ChangeTaskTitleACType | AddTodolistACType | RemoveTodolistACType

export const tasksReducer = (state: TasksStateType, action: ActionTaskType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {...state, [action.todoId]:
                    state[action.todoId].filter(t=> t.id !== action.taskId)}
        case ADD_TASK:
            const newTask:TaskType = {id: v1(), title: action.title, isDone: false}
            return  {...state, [action.todoId]: [newTask, ...state[action.todoId]]}
        case CHANGE_TASK_STATUS:
            return {...state, [action.todoId]:
                    state[action.todoId].map(t=> t.id === action.taskId
                        ? {...t, isDone: action.isDone} : t)}
        case CHANGE_TASK_TITLE:
            return {...state, [action.todoId]:
                    state[action.todoId].map(t=> t.id === action.taskId
                        ? {...t, title: action.title} : t)}
        case ADD_TODOLIST:
            return {[action.todoId]:[], ...state}
        case REMOVE_TODOLIST:
            let {[action.todoId]:[], ...rest} = {...state}
            return rest

        default: throw new Error("I dont know this type")
    }
}
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoId: string, taskId: string) => {
    return {
        type: REMOVE_TASK,
        todoId,
        taskId
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoId: string, title: string) => {
    return {
        type: ADD_TASK,
        todoId,
        title
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoId: string, taskId: string, isDone: boolean) => {
    return {
        type: CHANGE_TASK_STATUS,
        todoId,
        taskId,
        isDone
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todoId: string, taskId: string, title: string) => {
    return {
        type: CHANGE_TASK_TITLE,
        todoId,
        taskId,
        title
    } as const
}