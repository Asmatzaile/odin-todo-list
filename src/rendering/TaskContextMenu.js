const removeContextMenu = () => {
    const el = document.querySelector("#contextmenu");
    if (el) el.parentElement.removeChild(el);
}

const TaskContextMenu = (task, closeMenu) => {
    const el = document.createElement("div");
    el.classList = "absolute flex flex-col text-xl rounded-sm overflow-clip border-solid border-4 bg-black gap-1 shadow-md";
    el.id = "contextmenu";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList = "darkenonhover text-left p-4";
    deleteButton.onclick = () => {
        task.delete();
        closeMenu();
    }
    const toggleDoneButton = document.createElement("button");
    toggleDoneButton.textContent = "Mark as" + (task.isDone ? " not " : " ") + "done";
    toggleDoneButton.classList = "darkenonhover text-left p-4";
    toggleDoneButton.onclick = () => {
        task.isDone = !task.isDone;
        closeMenu();
    }
    el.append(deleteButton, toggleDoneButton);
    return el;
}

export const createTaskContextMenu = (e, task) => {
    e.preventDefault();
    removeContextMenu(); // if there was a lingering one
    const controller = new AbortController();
    const closeMenu = () => {
        removeContextMenu();
        controller.abort();
    }
    const taskContextMenu = TaskContextMenu(task, closeMenu);
    const closeIfOutside = (e) => {
        if (document.elementsFromPoint(e.clientX, e.clientY).includes(taskContextMenu)) return;
        closeMenu();
    }
    document.addEventListener("pointerdown", closeIfOutside, { signal: controller.signal });

    const papa = document.querySelector("#tasklist");
    taskContextMenu.style.left = e.clientX - papa.offsetLeft + "px";
    taskContextMenu.style.top = e.clientY - papa.offsetTop + "px";
    papa.appendChild(taskContextMenu);
}