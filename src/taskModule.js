export const newTask = (function() {
    let id = localStorage.getItem("task-id") || 0;
    return function(title, description = "", dueDate = new Date(), isImportant, notes = ""){
        localStorage.setItem("task-id", parseInt(id, 10) + 1);
        return [id, {
            isFinished: false,
            title,
            description,
            dueDate: JSON.stringify(dueDate).slice(1, 11),
            isImportant,
            notes,
        }]
    }
})();

export const newList = (function() {
    let id = localStorage.getItem("list-id") || 0;
    return function(title){
        localStorage.setItem("list-id", parseInt(id, 10) + 1);
        return [id++, {
            title,
            childTasks: [],
        }]
    }
})();