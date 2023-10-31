import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
// import {v1} from "uuid";


export  type FilterValuesType = "active" | "completed" | "all"
function App() {
    const title = "What to learn"

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: "HTML", isDone: true},
        {id: crypto.randomUUID(), title: "CSS", isDone: true},
        {id: crypto.randomUUID(), title: "JS/TS", isDone: false},
        {id: crypto.randomUUID(), title: "React", isDone: false},
    ])
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId))
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const addTask = (title: string) => {
        const newTask = {id: crypto.randomUUID(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const changedTask = tasks.map(t=> t.id === taskId ? {...t, isDone: isDone} : t)
        setTasks(changedTask)
    }
    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "completed":
                return tasks.filter((f) => f.isDone)
            case "active":
                return tasks.filter((f) => !f.isDone)
            default:
                return tasks
        }
    }

    let filteredTasks = getFilteredTasks(tasks, filter)

    return (
        <div className={"App"}>
            <Todolist title={title}
                      filter={filter}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
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