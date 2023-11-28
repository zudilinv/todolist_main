import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const REMOVE_TODOLIST = "REMOVE-TODOLIST"
export const ADD_TODOLIST = "ADD-TODOLIST"
export const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"
export const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER"

export type ActionTodoType = RemoveTodolistACType | AddTodolistACType
        | ChangeTodolistACType | ChangeTodolistFilterACType
export const todolistsReducer = (state: TodolistType[], action: ActionTodoType): TodolistType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(s=> s.id !== action.todoId )
        case ADD_TODOLIST:
            const newTodo:TodolistType = {id: action.todoId, title: action.title, filter: "all"}
            return [newTodo, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(s=> s.id === action.todoId
                ? {...s, title: action.title} : s)
        case CHANGE_TODOLIST_FILTER:
            return state.map(s=> s.id === action.todoId
                ? {...s, filter: action.filter} : s)

        default: throw new Error("I do not know this type")
    }
}
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todoId: string) => {
    return {
        type: REMOVE_TODOLIST,
        todoId
    } as const
}
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: ADD_TODOLIST,
        todoId: v1(),
        title
    } as const
}
type ChangeTodolistACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todoId: string, title: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        todoId,
        title
    } as const
}
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todoId: string, filter: FilterValuesType) => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        todoId,
        filter
    } as const
}