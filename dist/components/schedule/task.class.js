"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(options) {
        this.order = options ? options.order : '';
        this.data = options ? options.data : '';
        this.month = options ? options.month : '';
        this.name = options ? options.name : '';
        this.time = options ? options.time : '';
        this.place = options ? options.place : '';
        this.description = options ? options.description : '';
    }
    ;
    toMessage() {
        return `${this.order}. ${this.time} - ${this.description}\n${this.place}\n`;
    }
    get() {
        return {
            order: this.order,
            data: this.data,
            month: this.month,
            name: this.name,
            time: this.time,
            place: this.place,
            description: this.description,
            toMessage: this.toMessage,
        };
    }
    ;
}
exports.Task = Task;
