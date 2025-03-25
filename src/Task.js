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

    get data() { return { title: this.title, description: this.description, dueDate: this.dueDate, importance: this.importance, tagList: this.tagList } };

    constructor({ title, description, dueDate, importance, tagList=[] }) {
        this.#title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.importance = importance;
        tagList.forEach(this.#tagList.add, this.#tagList);
    }

    get title() { return this.#title }
    set title(value) { this.#title = value }

    get description() { return this.#description }
    set description(value) { this.#description = value }

    get dueDate() { return this.#dueDate }
    set dueDate(value) { this.#dueDate = value }

    get importance() { return this.#importance }
    set importance(value) {
        if (!(Object.values(Task.importances).includes(value) || value === undefined)) throw new TypeError("Importance has to be one of Task.importances")
        this.#importance = value;
    }

    get tagList() { return [...this.#tagList] }
    hasTag(tag) { return this.#tagList.has(tag) }
    addTag(newTag) { this.#tagList.add(newTag) }
    removeTag(tag) { this.#tagList.delete(tag) }
}
