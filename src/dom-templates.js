import { formatDueDateString, newElement } from "./tools";
import arrowRight from "./img/arrow-right.svg"
import point from "./img/point.svg"

export const listFullPageTemplate = function(listID){
    const myList = JSON.parse(localStorage.getItem("lists"))[listID];
    const myListPageNode = newElement("div", ["className", "list-fullpage"]);
    myListPageNode.append(newElement("h1", ["className", "list-title-fullpage"], ["innerText", myList.title]));

    for (let taskID of myList.childTasks) {
        myListPageNode.append(newTaskNode(taskID));
    }
    return myListPageNode
}

export const newSidebarListNode = function(listID, listObj) {
    let myListNode = newElement("div", ["className", "side-section"]);
    let myListTitle = newElement("p", ["innerText", listObj.title]);
    let pointImage = newElement("img", ["className", "icon"], ["src", point]);
    myListNode.append(pointImage, myListTitle);
    myListNode.dataset["listId"] = listID;

    return myListNode
}

const newTaskNode = function(taskID){
    const myTask = JSON.parse(localStorage.getItem("tasks"))[taskID];
    
    const myTaskNode = newElement("div", ["className", "task"]);
    myTaskNode.append(newElement("img", ["src", arrowRight], ["className", "icon task-arrow"]))

    // task title
    myTaskNode.append(newElement("p", ["className", "task-title"], ["innerText", myTask.title]));

    // task description
    if (myTask.description != "") {
        myTaskNode.append(newElement("p", ["className", "task-description"], ["innerText", myTask.description]));
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
        myTaskNode.append(myTaskDetails);
    }

    // task finish status
    myTaskNode.classList.add(myTask.isFinished ? "finished" : "unfinished");

    // task importance
    if (myTask.isImportant) myTaskNode.classList.add("important");

    // task data-id
    myTaskNode.dataset.taskId = taskID;

    return myTaskNode
}
