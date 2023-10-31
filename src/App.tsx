import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";

export type FilterValueType = "active" | "completed" | "all"

function App() {

    const title1 = "What to learn"

    let [filter, setFilter] = useState<FilterValueType>("all")

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const changeFilter = (value: FilterValueType) => {
            setFilter(value)
    }
    let tasksForTodolist = tasks
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(f => f.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(f => !f.isDone)
    }

    return (
        <div className="App">
            <Todolist title={title1} tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;

