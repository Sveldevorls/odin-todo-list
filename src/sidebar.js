import { listFullPageTemplate, sidebarListNode } from "./dom-templates";
import { sidebarLists, mainDisplay, renderContentAt } from "./ui";


export const sidebarShowLists = function() {
    const myLists = JSON.parse(localStorage.getItem("lists"));
    for (let[id, list] of Object.entries(myLists)) {
        sidebarLists.append(sidebarListNode(id, list));
    }

    // every div in #lists has a dataset list-id
    sidebarLists.addEventListener("click", (e) => {
        let targetListID = e.target.closest("div").dataset["listId"];
        renderContentAt(mainDisplay, listFullPageTemplate(targetListID));
    })
}