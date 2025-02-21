import autosize from "autosize";
import { formatDueDateString, newElement } from "./tools";
import { editor, renderContentAt } from "./ui";
import arrowRight from "./img/arrow-right.svg";
import point from "./img/point.svg";


export const listFullPageTemplate = function(listID){
    const myList = JSON.parse(localStorage.getItem("lists"))[listID];
    const myListPageNode = newElement("div", ["className", "list-fullpage"]);
    myListPageNode.append(newElement("h1", ["className", "list-title-fullpage"], ["innerText", myList.title]));

    for (let taskID of myList.childTasks) {
        myListPageNode.append(newTaskNode(taskID));
    }

    myListPageNode.addEventListener("click", (e) => {
        let closestTaskDiv = e.target.closest(".task");
        if (closestTaskDiv != null) {
            renderContentAt(editor, taskEditTemplate(closestTaskDiv.dataset["taskId"]));
        }
    })
    return myListPageNode
}


export const newSidebarListNode = function(listID, listObj) {
    const myListNode = newElement("div", ["className", "side-section"]);
    const myListTitle = newElement("p", ["innerText", listObj.title]);
    const pointImage = newElement("img", ["className", "icon"], ["src", point]);
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


export const taskEditTemplate = function(taskID) {
    const myTask = JSON.parse(localStorage.getItem("tasks"))[taskID];
    const myTaskEditorNode = newElement("div", ["className", "editor"]);

    const myTaskEditorTitleLabel = newElement("label", ["htmlFor", "editor-title"], ["innerText", "Title"]);
    const myTaskEditorTitle = newElement("textarea", ["placeholder", "Add a title (required)"], ["value", myTask.title], ["id", "editor-title"]);
    autosize(myTaskEditorTitle);
    
    const myTaskEditorDescriptionLabel = newElement("label", ["htmlFor", "editor-description"], ["innerText", "Description"]);
    const myTaskEditorDescription = newElement("textarea", ["placeholder", "Add some description"], ["value", myTask.description], ["id", "editor-description"]);
    autosize(myTaskEditorDescription);

    const myTaskEditorPriorityLabel = newElement("label", ["htmlFor", "editor-priority"], ["innerText", "Priority"]);
    const myTaskEditorPriority = newElement("select", ["id", "editor-priority"]);
    myTaskEditorPriority.append(newElement("option", ["value", "normal"], ["innerText", "Normal"]));
    myTaskEditorPriority.append(newElement("option", ["value", "important"], ["innerText", "Important"]));
    myTask.isImportant ? myTaskEditorPriority.value = "important" : myTaskEditorPriority.value = "normal";

    // renders a text input with "Add a due date" inside when no due date is specified
    // if a date is specified, renders a date input
    const myTaskEditorDateLabel = newElement("label", ["htmlFor", "editor-date"], ["innerText", "Due date"]);
    const myTaskEditorDate = newElement("input", ["type", "text"], ["placeholder", "Add a due date"], ["id", "editor-date"]);
    if (myTask.dueDate != "") {
        myTaskEditorDate.type = "date";
        myTaskEditorDate.value = myTask.dueDate;
    }
    myTaskEditorDate.addEventListener("click", (e) => {
        if (e.target.value ==  "") e.target.type = "date";
    })
    myTaskEditorDate.addEventListener("focusout", (e) => {
        e.target.value ==  "" ? e.target.type = "text" : e.target.type = "date";
    })

    const myTaskEditorNotesLabel = newElement("label", ["htmlFor", "editor-notes"], ["innerText", "Notes"]);
    const myTaskEditorNotes = newElement("textarea", ["placeholder", "Add some notes"], ["value", myTask.notes], ["id", "editor-notes"]);
    autosize(myTaskEditorNotes);

    myTaskEditorNode.append(myTaskEditorTitleLabel, myTaskEditorTitle,
                            myTaskEditorDescriptionLabel, myTaskEditorDescription,
                            myTaskEditorPriorityLabel, myTaskEditorPriority,
                            myTaskEditorDateLabel, myTaskEditorDate,
                            myTaskEditorNotesLabel, myTaskEditorNotes);
    
    
    const myTaskDeleteButton = newElement("button", ["className", "delete-button"], ["innerText", "Delete this task"]);
    myTaskEditorNode.append(myTaskDeleteButton);

    return myTaskEditorNode
}