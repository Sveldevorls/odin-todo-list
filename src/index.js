import "./styles.css"
import { startApp } from "./app"
import { sidebarRenderLists } from "./sidebar";
import { renderTask } from "./mainDisplay";

startApp();
sidebarRenderLists();
for (let i of JSON.parse(localStorage.getItem("lists"))[0]["childTasks"]) {
    renderTask(i);
}