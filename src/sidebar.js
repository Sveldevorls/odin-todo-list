import { newElement } from "./tools"
import point from "./img/point.svg"

export const sidebarRenderLists = function(){
    const listsDiv = document.getElementById("lists");
    listsDiv.replaceChildren();

    const myLists = JSON.parse(localStorage.getItem("lists"));
    for (let[id, list] of Object.entries(myLists)) {
        let myListNode = newElement("div", ["className", "side-section"]);
        let myListTitle = newElement("p", ["innerText", list.title]);
        let pointImage = newElement("img", ["className", "icon"], ["src", point]);
        myListNode.append(...[pointImage, myListTitle]);
        myListNode.dataset.taskId = id;
        listsDiv.appendChild(myListNode);
    }
}