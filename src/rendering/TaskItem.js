export const TaskItem = ({isDone}) => {
    const el = document.createElement('div');
    el.classList = `flex-none flex gap-4 ${!isDone ? "bg-white" : "bg-yellow-light text-yellow-dark line-through"} p-4 border-2 border-solid shadow-md h-25 text-4xl font-bold`;
    return el;
}
