import React from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";

function App() {

    const title1 = "What to learn"
    const title2 = "What to bay"

    const tasks1: TaskType[] = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ]
    const tasks2: TaskType[] = [
        {id: 1, title: "Bread", isDone: true},
        {id: 2, title: "Milk", isDone: false},
        {id: 3, title: "Juice", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title={title1} tasks={tasks1}/>
            <Todolist title={title2} tasks={tasks2}/>
        </div>
    );
}

export default App;
