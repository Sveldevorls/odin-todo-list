import { newElement } from "./tools"
import arrowRight from "./img/arrow-right.svg"
import clock from "./img/clock.svg"
import notes from "./img/note.svg"
import priorityMedium from "./img/excl.svg"
import priorityHigh from "./img/excl-double.svg"

const mainDisplay = document.getElementById("main");

const formatDueDateString = (date) => {
    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    const dates = date.split("-");
    return `${monthNames[dates[1] - 1]} ${dates[2]}, ${dates[0]}`
}

export const renderTask = function(id){
    const myTask = JSON.parse(localStorage.getItem("tasks"))[id];
    
    const myTaskDiv = newElement("div", ["className", "task"]);

    const myTaskInner = newElement("div", ["className", "task-inner"]);
    const myTaskSide = newElement("div", ["className", "task-side"]);

    const arrow = newElement("img", ["className", "icon"], ["src", arrowRight]);
    
    const myTaskTitle = newElement("p", ["className", "task-title"], ["innerText", myTask.title]);
    const myTaskDescription = newElement("p", ["className", "task-description"], ["innerText", myTask.description]);

    const myTaskDetails = newElement("ul", ["className", "task-details"]);

    if (myTask.priority === 1 || myTask.priority === 2) {
        const priorityLi = newElement("li");
        priorityLi.append(newElement("img", ["className", "icon"], ["src", [priorityMedium, priorityHigh][myTask.priority-1]]))
        myTaskDetails.append(priorityLi);
    }

    if (myTask.notes != "") {
        const notesLi = newElement("li");
        notesLi.append(newElement("img", ["className", "icon"], ["src", notes]));
        myTaskDetails.append(notesLi);
    }
    
    const dueDateLi = newElement("li");
    dueDateLi.append(...[newElement("img", ["className", "icon"], ["src", clock]), formatDueDateString(myTask.dueDate)]);
    
    myTaskDetails.append(dueDateLi);

    myTaskInner.append(...[myTaskTitle, myTaskDescription, myTaskDetails]);
    myTaskSide.append(arrow)
    myTaskDiv.append(...[myTaskInner, myTaskSide]);

    const finishedStatus = myTask.isFinished ? "finished" : "unfinished";
    const priority = ["low", "medium", "high"][myTask.priority];

    myTaskDiv.classList.add(finishedStatus);
    myTaskDiv.classList.add(priority);

    myTaskDiv.dataset.taskId = id;

    mainDisplay.append(myTaskDiv);
}

