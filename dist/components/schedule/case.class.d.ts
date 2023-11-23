import { ICase } from "./cases.interface";
import { ITask } from "./task.interface";
export declare class Case implements ICase {
    name: string | undefined;
    tasks: ITask[];
    constructor(options: ICase);
}
