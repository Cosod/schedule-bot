import { ICase } from "./cases.interface";
import { ITask } from "./task.interface";

export class Case implements ICase {
  public name: string | undefined;
  public tasks: ITask[];

  constructor(options: ICase) {
    this.name = options ? (options.name || '') : '';
    this.tasks = options ? options.tasks : []
  }
}