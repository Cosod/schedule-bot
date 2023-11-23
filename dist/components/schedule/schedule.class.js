"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const constant_1 = require("../../constant/constant");
const functions_1 = require("../../utils/functions");
const case_class_1 = require("./case.class");
const task_class_1 = require("./task.class");
const translateName = (name) => {
    const names = {
        'понедельник': constant_1.MONDAY,
        'вторник': constant_1.TUESDAY,
        'среда': constant_1.WEDNESDAY,
        'четверг': constant_1.THURSDAY,
        'пятница': constant_1.FRIDAY,
        'суббота': constant_1.SATURDAY
    };
    return names[name];
};
class Schedule {
    constructor(emitter) {
        this.content = null;
        this.tasks = [];
        this.cases = [
            constant_1.MONDAY,
            constant_1.TUESDAY,
            constant_1.WEDNESDAY,
            constant_1.THURSDAY,
            constant_1.FRIDAY,
            constant_1.SATURDAY,
            constant_1.ALL
        ];
        this.emitter = emitter;
        this.prepare();
    }
    ;
    prepare() {
        this.emitter.on('create-schedule', (content, ctx, type) => {
            this.create(content, ctx, type);
        });
        this.emitter.on('get-schedule-messages', (type, messages) => {
            const scheduleMessages = this.getMessages(type);
            scheduleMessages.forEach(message => messages.push(message));
        });
    }
    createCases() {
        this.cases = this.cases.map(name => new case_class_1.Case({
            name: typeof name === 'string'
                ? name
                : undefined,
            tasks: []
        }));
    }
    ;
    createTasks() {
        if (!this.content)
            return;
        const task = new task_class_1.Task();
        (0, functions_1.foreach)(this.content, (_, item) => {
            if (Array.isArray(item)) {
                (0, functions_1.include)(item, '2023').then(() => {
                    task.data = item[0];
                    task.name = item[5];
                    task.month = item[1];
                });
                const isOrder = (item[0] && !item[1] && Number(item[0]));
                const isTime = (item[0].includes(':') && item[2].includes(':'));
                const toStrTime = (first, second) => [first, '/', second].join(' ');
                if (isOrder) {
                    task.order = item[0];
                }
                ;
                if (isTime) {
                    task.time = toStrTime(item[0], item[2]);
                }
                ;
                (0, functions_1.include)(item, '_subject_').then(() => {
                    task.description = (0, functions_1.arrToStr)(item, (item) => item !== '_subject_');
                });
                (0, functions_1.include)(item, '_place_').then(() => {
                    task.place = (0, functions_1.arrToStr)(item, (item) => item !== '_place_');
                    const options = task.get();
                    this.tasks.push(options);
                });
            }
        });
    }
    create(content, ctx, type) {
        this.clear();
        this.content = content;
        this.createCases();
        this.createTasks();
        this.tasks.forEach(task => {
            const name = translateName(task.name.toLowerCase());
            this.cases.forEach(event => {
                if (typeof event !== 'string') {
                    if ((event.name === name) || (event.name === constant_1.ALL)) {
                        event.tasks.push(new task_class_1.Task(task));
                    }
                }
            });
        });
        this.emitter.emit('show-schedule-messages', ctx, type);
    }
    ;
    findCase(name) {
        for (const event of this.cases) {
            if (typeof event === 'string')
                return;
            if (event.name === name)
                return event;
        }
    }
    ;
    getMessages(type) {
        const messages = [];
        for (const event of this.cases) {
            if (typeof event === 'string') {
                return messages;
            }
            ;
            if ((event.name === type) || (type === constant_1.ALL)) {
                if (event.name === constant_1.ALL) {
                    return messages;
                }
                ;
                let message = event.name.toUpperCase();
                event.tasks.forEach((task, item) => {
                    if (item === 0)
                        message += ` - ${task.data} \n\n`;
                    message += task.toMessage();
                    message += "\n";
                });
                messages.push(message);
            }
            ;
        }
        ;
        return messages;
    }
    ;
    clear() {
        this.tasks = [];
        this.cases = [
            constant_1.MONDAY,
            constant_1.TUESDAY,
            constant_1.WEDNESDAY,
            constant_1.THURSDAY,
            constant_1.FRIDAY,
            constant_1.SATURDAY,
            constant_1.ALL
        ];
    }
}
exports.Schedule = Schedule;
;
