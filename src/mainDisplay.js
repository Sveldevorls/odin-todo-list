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
    myTaskDiv.append(newElement("img", ["src", arrowRight], ["className", "icon task-arrow"]))

    // task title
    myTaskDiv.append(newElement("p", ["className", "task-title"], ["innerText", myTask.title]));

    // task description
    if (myTask.description != "") {
        myTaskDiv.append(newElement("p", ["className", "task-description"], ["innerText", myTask.description]));
    }

    // task details
    if (myTask.isImportant == true || myTask.notes != "" || myTask.dueDate != ""){
        const myTaskDetails = newElement("div", ["className", "task-details"]);
        if (myTask.isImportant) {
            myTaskDetails.append(newElement("p", ["innerText", "Important"], ["style", "color:red"]));
        }
        if (myTask.notes != "") {
            myTaskDetails.append(newElement("p", ["innerText", "Notes"]));
        }
        if (myTask.dueDate != "") {
            myTaskDetails.append(newElement("p", ["innerText", formatDueDateString(myTask.dueDate)]));
        }
        myTaskDiv.append(myTaskDetails);
    }

    // task finish status
    myTaskDiv.classList.add(myTask.isFinished ? "finished" : "unfinished");

    // task importance
    if (myTask.isImportant) myTaskDiv.classList.add("important");

    // task data-id
    myTaskDiv.dataset.taskId = id;

    mainDisplay.append(myTaskDiv);
}

