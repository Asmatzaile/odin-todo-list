import { createTasksView } from "./createTasksView";
import { TaskDetails } from "./TaskDetails";

export class AppRenderer {
    content = document.querySelector('#content');

    openTask = undefined;
    setOpenTask = (task) => {this.openTask = this.openTask === task ? undefined : task; this.render()}

    constructor(taskManager) {
        this.taskManager = taskManager;
        document.addEventListener('save', this.render);
    }

    render = () => {
        this.content.textContent = "";
        const div = document.createElement("div");
        div.classList = "grid auto-cols-1fr grid-flow-col"
        const tasksView = createTasksView(this.taskManager, this.setOpenTask);
        div.append(tasksView);
        if (this.openTask) {
            const detailedTask = TaskDetails({ task: this.openTask });
            div.append(detailedTask);
        }
        this.content.append(div);
    }
}
