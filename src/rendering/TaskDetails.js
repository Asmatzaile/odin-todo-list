export const TaskDetails = ({task}) => {
    const el = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = task.title;
    el.append(title);
    return el;
}
