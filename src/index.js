import "./styles.css"
import { startApp } from "./app"
import { sidebarRenderLists } from "./sidebar";
import { renderTask } from "./mainDisplay";

startApp();
sidebarRenderLists();
renderTask(0);