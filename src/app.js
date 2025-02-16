import { newList, newTask } from "./taskModule";


export const startApp = function(){
    if (localStorage.getItem("lists") === null) {
        addList(...newList("Default"));
    }
    if (localStorage.getItem("tasks") === null) {
        addTask(...newTask("Sample task", "This is how a task looks like", null, false, ""));
        addTask(...newTask("Tasks can have notes and due dates", "", new Date(), false, "Sample note"));
        addTask(...newTask("Tasks can also be important", "And will be highlighted in red", null, true, ""));

        addTaskToList(0, 0);
        addTaskToList(1, 0);
        addTaskToList(2, 0);
    }
}


const addList = function(id, list){
    let myLists = JSON.parse(localStorage.getItem("lists")) || {};
    myLists[id] = list;
    localStorage.setItem("lists", JSON.stringify(myLists));
}

const addTask = function(id, task){
    let myTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    myTasks[id] = task;
    localStorage.setItem("tasks", JSON.stringify(myTasks));
}

const addTaskToList = function(taskID, listID) {
    let myLists = JSON.parse(localStorage.getItem("lists")) || {};
    myLists[listID]["childTasks"].push(taskID);
    localStorage.setItem("lists", JSON.stringify(myLists));
}