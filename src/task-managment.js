export const getTaskFromID = (taskID) => {
    return JSON.parse(localStorage.getItem("tasks"))[taskID];
}

export const pushTaskToStorage = function(taskID, newTask) {
    const allTasks = JSON.parse(localStorage.getItem("tasks"));
    allTasks[taskID] = newTask;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

export const updateTaskFromEditor = function(task, taskEditorForm) {
    task.title = taskEditorForm.elements['editor-title'].value != "" ? taskEditorForm.elements['editor-title'].value : task.title;
    task.description = taskEditorForm.elements['editor-description'].value;
    task.isImportant = taskEditorForm.elements['editor-priority'].value == "important" ? true : false;
    task.dueDate = taskEditorForm.elements['editor-date'].value;
    task.notes = taskEditorForm.elements['editor-notes'].value;
}




export const getListFromID = (listID) => {
    return JSON.parse(localStorage.getItem("lists"))[listID];
}