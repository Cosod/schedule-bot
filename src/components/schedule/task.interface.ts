export interface ITask {
  order: string,
  data: string,
  month: string,
  name: string,
  time: string,
  place: string,
  description: string,
  toMessage(): string,
}