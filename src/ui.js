export const sidebar = document.getElementById("sidebar");
export const sidebarLists = document.getElementById("lists");
export const mainDisplay = document.getElementById("main");
export const infoDisplay = document.getElementById("info");

export const renderContentAt = function(location, content) {
    location.replaceChildren();
    location.append(content);
}