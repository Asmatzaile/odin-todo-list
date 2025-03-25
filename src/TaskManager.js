import { TaskStorer } from "./TaskStorer";

export class TaskManager {
    #tasks = new Set();

    constructor() {
        const loadedTasks = TaskStorer.load();
        if (loadedTasks) loadedTasks.forEach(task => this.add(task));
    }

    add(task) {
        this.#tasks.add(task);
        TaskStorer.store(this.#tasks);
    }

    delete(task) {
        this.#tasks.delete(task);
        TaskStorer.store(this.#tasks);
    }

    getTasksWithTag(tag) {
        if (tag === undefined) return this.tasks;
        return [...this.tasks].filter(task => task.hasTag(tag));
    }

    get tasks() { return this.#tasks }
    get tags() { return this.#tasks.reduce((allTags, task) => allTags.add(task.taglist), new Set()) }
}
