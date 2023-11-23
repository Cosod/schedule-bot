import { ITask } from "./task.interface";
export declare class Task implements ITask {
    order: string;
    data: string;
    month: string;
    name: string;
    time: string;
    place: string;
    description: string;
    constructor(options: ITask | void);
    toMessage(): string;
    get(): ITask;
}
