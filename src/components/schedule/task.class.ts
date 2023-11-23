import { ITask } from "./task.interface";

export class Task implements ITask {
  public order: string;
  public data: string;
  public month: string;
  public name: string;
  public time: string;
  public place: string;
  public description: string;

  constructor(options: ITask | void) {
    this.order = options ? options.order : '';
    this.data = options ? options.data : '';
    this.month = options ? options.month : '';
    this.name = options ? options.name : '';
    this.time = options ? options.time : '';
    this.place = options ? options.place : '';
    this.description = options ? options.description : '';
  };

  toMessage(): string {
    return `${this.order}. ${this.time} - ${this.description}\n${this.place}\n`;
  }

  get(): ITask {
    return {
      order: this.order,
      data: this.data,
      month: this.month,
      name: this.name,
      time: this.time,
      place: this.place,
      description: this.description,
      toMessage: this.toMessage,
    }
  };
}