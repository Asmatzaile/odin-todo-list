import { Task } from "./Task";

export class TaskStorer {
    static load() {
        const tasksData = JSON.parse(localStorage.getItem("tasks"));
        if (tasksData === null) return [];
        return tasksData.map(taskData => new Task(taskData));
    }

    static store(tasks) {
        const tasksData = [...tasks].map(task => task.data);
        localStorage.setItem("tasks", JSON.stringify(tasksData));
    }
}
