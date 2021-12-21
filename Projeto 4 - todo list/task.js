class Task {
    constructor(title = 'No titled task', description = 'No description') {
        this.title = title;
        this.description = description;
        this.creationDate = this.getDayInfo();
        this.updateDate = this.creationDate;
    }
    setTitle(title) {
        this.title = title;
    }
    setDescription(description) {
        this.description = description;
    }
    getDayInfo() {
        const d = new Date();
        return {
            day: d.getDate(),
            month: d.getMonth(),
            year: d.getFullYear(),
            hour: d.getHours(),
            min: d.getMinutes(),
        }
    }
    updateLastEdit() {
        this.updateDate = this.getDayInfo();
    }
}