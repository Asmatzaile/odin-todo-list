import { TaskStorer } from "./TaskStorer";
import { Task } from "./Task";

export class TaskManager {
    #tasks = new Set();

    constructor() {
        const loadedTasks = TaskStorer.load();
        if (loadedTasks) loadedTasks.forEach(task => this.add(task));
        const manager = this;
        document.addEventListener('taskupdate', manager.save.bind(manager));
    }

    save() {
        TaskStorer.store(this.tasks);
        document.dispatchEvent(new Event('save'));
    }

    add(task) {
        task = task instanceof Task ? task : new Task(task);
        task.delete = () => this.delete(task);
        this.#tasks.add(task);
        this.save();
    }

    delete(task) {
        this.#tasks.delete(task);
        this.save();
    }

    getTasksWithTag(tag) {
        if (tag === undefined) return this.tasks;
        return [...this.tasks].filter(task => task.hasTag(tag));
    }

    get tasks() { return this.#tasks }
    get tags() { return this.#tasks.reduce((allTags, task) => allTags.add(task.taglist), new Set()) }
}
