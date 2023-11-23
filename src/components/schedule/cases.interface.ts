import { ITask } from "./task.interface";

export interface ICase {
  name: string | undefined,
  tasks: ITask[]
}