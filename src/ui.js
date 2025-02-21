export const sidebar = document.getElementById("sidebar");
export const sidebarLists = document.getElementById("lists");
export const mainDisplay = document.getElementById("main");
export const editor = document.getElementById("editor");

export const renderContentAt = function(location, ...contents) {
    location.replaceChildren();
    for (let content of contents) {
        location.append(content);
    }
}