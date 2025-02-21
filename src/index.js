import "./styles.css"
import { startApp } from "./app"
import { sidebarShowLists } from "./sidebar";

import { editor, renderContentAt } from "./ui";
import { taskEditTemplate } from "./dom-templates";

startApp();
sidebarShowLists();

renderContentAt(editor, taskEditTemplate(0));