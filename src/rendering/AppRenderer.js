import { createTasksView } from "./createTasksView";

export class AppRenderer {
    content = document.querySelector('#content');

    constructor(taskManager) {
        this.taskManager = taskManager;
        document.addEventListener('save', this.render);
    }

    render = () => {
        this.content.textContent = "";
        const tasksView = createTasksView(this.taskManager);
        this.content.append(tasksView);
    }
}
