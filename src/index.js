import "./styles/style.css"
import { TaskManager } from "./logic/TaskManager";
import { AppRenderer } from "./rendering/AppRenderer";

const taskManager = new TaskManager();
const appRenderer = new AppRenderer(taskManager);

appRenderer.render();
