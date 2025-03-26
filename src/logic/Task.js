export class Task {
    static importances = {
        HIGH: "high",
        MEDIUM: "medium",
        LOW: "low",
    };

    #title;
    #description;
    #dueDate;
    #importance;
    #tagList = new Set();
    #isDone;

    get data() { return { title: this.title, description: this.description, dueDate: this.dueDate, importance: this.importance, tagList: this.tagList, isDone: this.isDone } };

    constructor({ title, isDone=false, description, dueDate, importance, tagList=[], }) {
        this.title = title;
        this.isDone = isDone;
        this.description = description;
        this.dueDate = dueDate;
        this.importance = importance;
        tagList.forEach(this.#tagList.add, this.#tagList);
        // return new Proxy(this, handler);
    }

    emit = () => {
        document.dispatchEvent(new Event('taskupdate'));
    }

    get title() { return this.#title }
    set title(value) {
        this.#title = value;
        this.emit();
    }

    get isDone() { return this.#isDone }
    set isDone(value) {
        this.#isDone = value;
        this.emit();
    }

    get description() { return this.#description }
    set description(value) {
        this.#description = value;
        this.emit();
    }

    get dueDate() { return this.#dueDate }
    set dueDate(value) {
        this.#dueDate = value;
        this.emit();
    }

    get importance() { return this.#importance }
    set importance(value) {
        if (!(Object.values(Task.importances).includes(value) || value === undefined)) throw new TypeError("Importance has to be one of Task.importances")
        this.#importance = value;
        this.emit();
    }

    get tagList() { return [...this.#tagList] }
    hasTag(tag) { return this.#tagList.has(tag) }
    addTag(newTag) {
        this.#tagList.add(newTag);
        this.emit();
    }
    removeTag(tag) {
        this.#tagList.delete(tag);
        this.emit();
    }
}
