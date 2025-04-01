import checkSvg from "../assets/check.svg";

export const Checkbox = ({ checked, onchange }) => {
    const container = document.createElement('div');
    container.classList = `relative ${checked ? "text-yellow-dark" : ""}`;
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList=`appearance-none cursor-pointer w-16 h-16 border-4 border-solid rounded-full ${checked ? "bg-yellow-dark" : ""} `;
    checkbox.checked = checked;
    container.appendChild(checkbox);
    checkbox.onclick = (e) => e.stopPropagation(); // so that the onclick of the parent is not fired
    checkbox.onchange = (e) => onchange(e.target.checked);
    if (!checked) return container;
    const checkmarkContainer = document.createElement('div');
    checkmarkContainer.classList = "absolute inset-0 grid place-content-center text-yellow-light pointer-events-none";
    checkmarkContainer.innerHTML = checkSvg;
    container.appendChild(checkmarkContainer);
    return container;
}
