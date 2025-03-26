const createDoneCheckbox = task => {
    const doneCheckbox = document.createElement('input');
    doneCheckbox.setAttribute('type', 'checkbox');
    doneCheckbox.checked = task.isDone;
    doneCheckbox.onchange = (e) => task.isDone = e.target.checked;
    return doneCheckbox;
}

const createTitleEl = content => {
    const titleEl = document.createElement('h3');
    titleEl.classList = "text-4xl font-bold"
    titleEl.textContent = content;
    return titleEl;
}

const createShortTaskEl = task => {
    const taskEl = document.createElement('div');
    taskEl.classList = "flex-none flex gap-4 bg-white p-4 border-2 border-black border-solid h-25"
    const titleEl = createTitleEl(task.title);
    const doneCheckbox = createDoneCheckbox(task);
 
    taskEl.append(doneCheckbox, titleEl);
    return taskEl;
}

const createNewTaskWidget = (taskManager) => {
    const taskEl = document.createElement('div');
    taskEl.classList = "flex-none flex gap-4 bg-white p-4 border-2 border-black border-solid h-25 shadow-md"
    const textEl = document.createElement('input');
    textEl.classList = "text-4xl font-bold"
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
