export const Checkbox = ({ checked, onchange }) => {
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = checked;
    checkbox.onchange = (e) => onchange(e.target.checked);
    return checkbox;
}
