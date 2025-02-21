import autosize from "autosize";
import { getTaskFromID, getListFromID, pushTaskToStorage, updateTaskFromEditor } from "./task-managment";
import { formatDueDateString, newElement } from "./tools";
import { editor, mainDisplay, renderContentAt } from "./ui";

import arrowRight from "./img/arrow-right.svg";
import point from "./img/point.svg";



export const listFullPageTemplate = function(listID){
    const myList = getListFromID(listID);
    const myListPageNode = newElement("div", ["className", "list-fullpage"]);
    myListPageNode.append(newElement("h1", ["className", "list-title-fullpage"], ["innerText", myList.title]));

    for (let taskID of myList.childTasks) {
        myListPageNode.append(taskNode(taskID));
    }

    myListPageNode.addEventListener("click", (e) => {
        let closestTaskDiv = e.target.closest(".task");
        if (closestTaskDiv != null) {
            renderContentAt(editor, ...taskEditTemplate(closestTaskDiv.dataset["taskId"]));
            editor.dataset["currentListId"] = listID;
        }
    })
    return myListPageNode
}


export const sidebarListNode = function(listID, listObj) {
    const myListNode = newElement("div", ["className", "side-section"]);
    const myListTitle = newElement("p", ["innerText", listObj.title]);
    const pointImage = newElement("img", ["className", "icon"], ["src", point]);
    myListNode.append(pointImage, myListTitle);
    myListNode.dataset["listId"] = listID;

    return myListNode
}


const taskNode = function(taskID){
    const myTask =getTaskFromID(taskID);
    
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
    const myTask = getTaskFromID(taskID);
    const myTaskEditorForm = newElement("form", ["className", "editor"]);

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

    myTaskEditorForm.append(
        myTaskEditorTitleLabel, myTaskEditorTitle,
        myTaskEditorDescriptionLabel, myTaskEditorDescription,
        myTaskEditorPriorityLabel, myTaskEditorPriority,
        myTaskEditorDateLabel, myTaskEditorDate,
        myTaskEditorNotesLabel, myTaskEditorNotes
    );
    
    myTaskEditorForm.addEventListener("focusout", () => {
        updateTaskFromEditor(myTask, myTaskEditorForm)
        myTaskEditorTitle.value = myTask.title;
        pushTaskToStorage(taskID, myTask);
        renderContentAt(mainDisplay, listFullPageTemplate(editor.dataset["currentListId"]));
    });


    // todo : add delete function
    const myTaskDeleteButton = newElement("button", ["className", "delete-button"], ["innerText", "Delete this task"]);

    return [myTaskEditorForm, myTaskDeleteButton]
}
