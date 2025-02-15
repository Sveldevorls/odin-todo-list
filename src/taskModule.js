export const newTask = (function() {
    let id = localStorage.getItem("task-id") || 0;
    return function(title, description = "", dueDate = null, priority, notes = ""){
        localStorage.setItem("task-id", id+1);
        return [id, {
            isFinished: false,
            title,
            description,
            dueDate,
            priority,
            notes,
        }]
    }
})();

export const newList = (function() {
    let id = localStorage.getItem("list-id") || 0;
    return function(title){
        localStorage.setItem("list-id", id+1);
        return [id++, {
            title,
            childTasks: [],
        }]
    }
})();