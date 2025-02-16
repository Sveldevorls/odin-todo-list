export const newTask = (function() {
    return function(title, description = "", dueDate, isImportant, notes = ""){
        let id = parseInt(localStorage.getItem("task-id"), 10) || 0;
        localStorage.setItem("task-id", parseInt(id, 10)+1);
        return [id, {
            isFinished: false,
            title,
            description,
            dueDate: dueDate instanceof Date ? JSON.stringify(dueDate).slice(1, 11) : "",
            isImportant,
            notes,
        }]
    }
})();

export const newList = (function() {
    return function(title){
        let id = parseInt(localStorage.getItem("list-id"), 10) || 0;
        localStorage.setItem("list-id", parseInt(id, 10)+1);
        return [id, {
            title,
            childTasks: [],
        }]
    }
})();