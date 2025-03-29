import { Checkbox } from "./Checkbox";
import { TaskItem } from "./TaskItem";

const createTitleEl = content => {
    const titleEl = document.createElement('h3');
    titleEl.textContent = content;
    return titleEl;
}

const createShortTaskEl = task => {
    const taskEl = TaskItem();
    const titleEl = createTitleEl(task.title);
    const doneCheckbox = Checkbox({ checked: task.isDone, onchange: v => task.isDone = v });
 
    taskEl.append(doneCheckbox, titleEl);
    return taskEl;
}

const createNewTaskWidget = (taskManager) => {
    const taskEl = TaskItem();
    taskEl.classList.add("shadow-md")
    const textEl = document.createElement('input');
    const buttonEl = document.createElement('button');
    buttonEl.onclick = () => {
        const title = textEl.value.trim();
        if (title === "") return;
        taskManager.add({ title })
    }
    textEl.setAttribute('placeholder', "Add task");
    taskEl.append(buttonEl, textEl);
    return taskEl;
}

const createTaskList = (taskManager) => {
    const taskEls = [...taskManager.tasks].map(createShortTaskEl);
    const taskListDiv = document.createElement('div');
    taskListDiv.classList = "flex-auto overflow-auto no-scrollbar flex flex-col gap-4 shadow-md";
    taskListDiv.append(...taskEls);
    return taskListDiv;
}

export const createTasksView = (taskManager) => {
    const taskViewDiv = document.createElement('div');
    taskViewDiv.classList = "bg-yellow flex flex-col gap-4 p-4 h-screen";
    const taskList = createTaskList(taskManager);
    const newTaskWidget = createNewTaskWidget(taskManager);
    taskViewDiv.append(taskList, newTaskWidget);
    return taskViewDiv;
}
