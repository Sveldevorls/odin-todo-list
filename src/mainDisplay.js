import { newElement } from "./tools"
import arrowRight from "./img/arrow-right.svg"
import clock from "./img/clock.svg"
import notes from "./img/note.svg"

const mainDisplay = document.getElementById("main");

const formatDueDateString = (date) => {
    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    const dates = date.split("-");
    return `Due ${monthNames[dates[1] - 1]} ${dates[2]}, ${dates[0]}`
}

export const renderTask = function(id){
    const myTask = JSON.parse(localStorage.getItem("tasks"))[id];
    
    const myTaskDiv = newElement("div", ["className", "task"]);

    const myTaskInner = newElement("div", ["className", "task-inner"]);
    const myTaskSide = newElement("div", ["className", "task-side"]);

    const arrow = newElement("img", ["src", arrowRight], ["className", "icon"]);
    
    const myTaskTitle = newElement("p", ["className", "task-title"], ["innerText", myTask.title]);
    const myTaskDescription = newElement("p", ["className", "task-description"], ["innerText", myTask.description]);

    const myTaskDetails = newElement("div", ["className", "task-details"]);

    if (myTask.isImportant) {
        myTaskDetails.append(newElement("p", ["innerText", "Important"], ["style", "color:red"]));
    }

    if (myTask.notes != "") {
        myTaskDetails.append(newElement("p", ["innerText", "Notes"]));
    }
    
    if (myTask.dueDate != "") {
        console.log(myTask.dueDate)
        myTaskDetails.append(newElement("p", ["innerText", formatDueDateString(myTask.dueDate)]));
    }
    
    myTaskInner.append(...[myTaskTitle, myTaskDescription, myTaskDetails]);
    myTaskSide.append(arrow)
    myTaskDiv.append(...[myTaskInner, myTaskSide]);

    myTaskDiv.classList.add(myTask.isFinished ? "finished" : "unfinished");
    if (myTask.isImportant) myTaskDiv.classList.add("important");
    

    myTaskDiv.dataset.taskId = id;

    mainDisplay.append(myTaskDiv);
}

