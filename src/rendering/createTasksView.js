import { Checkbox } from "./Checkbox";
import { TaskItem } from "./TaskItem";
import { createTaskContextMenu } from "./TaskContextMenu";

const createTitleEl = content => {
    const titleEl = document.createElement('h3');
    titleEl.textContent = content;
    return titleEl;
}

const createShortTaskEl = task => {
    const taskEl = TaskItem({isDone: task.isDone});
    const titleEl = createTitleEl(task.title);
    const doneCheckbox = Checkbox({ checked: task.isDone, onchange: v => task.isDone = v });
    taskEl.addEventListener("contextmenu", (e) => createTaskContextMenu(e, task));
    taskEl.append(doneCheckbox, titleEl);
    return taskEl;
}

const createNewTaskWidget = (taskManager) => {
    const taskEl = TaskItem({isDone: false}); // ofc it's the button. api could be better
    taskEl.classList.add("shadow-md")
    const textEl = document.createElement('input');
    const buttonEl = document.createElement('button');
    buttonEl.classList = "w-16 h-16 border-4 border-solid rounded-sm darkenonhover cursor-pointer"
    buttonEl.onclick = () => {
        const title = textEl.value.trim();
        if (title === "") return;
        taskManager.add({ title })
    }
    textEl.setAttribute('placeholder', "Add task");
    taskEl.append(buttonEl, textEl);
    return taskEl;
}

const createSubTaskList = (titleText, taskElements) => {
    const subTaskListDiv = document.createElement('div');
    const taskElsContainer = document.createElement('div');
    taskElsContainer.classList = "flex flex-col gap-4";
    taskElsContainer.append(...taskElements);
    const title = document.createElement('h2');
    title.textContent = titleText;
    subTaskListDiv.append(title, taskElsContainer);
    return subTaskListDiv;
}

const createTaskList = (taskManager) => {
    const pendingTaskEls = [...taskManager.tasks].filter(task => !task.isDone).map(createShortTaskEl);
    const doneTaskEls = [...taskManager.tasks].filter(task => task.isDone).map(createShortTaskEl);
    const taskListDiv = document.createElement('div');
    taskListDiv.classList = "flex-auto overflow-auto no-scrollbar flex flex-col gap-4 relative";
    taskListDiv.id = "tasklist"
    if (pendingTaskEls.length !== 0) taskListDiv.append(createSubTaskList('to do', pendingTaskEls));
    if (doneTaskEls.length !== 0) taskListDiv.append(createSubTaskList('done', doneTaskEls));
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
