import { newList, newTask } from "./taskModule";


export const startApp = function(){
    if (localStorage.getItem("lists") === null) {
        addList(...newList("Default"));
    }
    if (localStorage.getItem("tasks") === null) {
        addTask(...newTask("Sample task", "Sample description", new Date(), 2, "Sample note"));
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