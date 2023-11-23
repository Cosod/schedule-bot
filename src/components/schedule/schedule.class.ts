import { EventEmitter } from "stream";
import {
  FRIDAY,
  MONDAY, 
  SATURDAY,
  THURSDAY,
  TUESDAY, 
  WEDNESDAY, 
  ALL 
} from "../../constant/constant";

import {
  arrToStr,
  foreach,
  include
} from "../../utils/functions";
import { Case } from "./case.class";
import { ICase } from "./cases.interface";

import {
  Task
} from "./task.class";
import { ITask } from "./task.interface";

const translateName = (name: string): string => {
  const names: {
    [key:string]:string
  } = {
    'понедельник': MONDAY,
    'вторник': TUESDAY,
    'среда': WEDNESDAY,
    'четверг': THURSDAY,
    'пятница': FRIDAY,
    'суббота': SATURDAY
  };

  return names[name];
}


export class Schedule {
  private content: string[][] | null;
  private cases: string[] | ICase[];
  private tasks: ITask[];
  emitter: EventEmitter;

  constructor(emitter: EventEmitter) {
    this.content = null;
    this.tasks = [];
    this.cases = [
      MONDAY,
      TUESDAY,
      WEDNESDAY,
      THURSDAY,
      FRIDAY,
      SATURDAY,
      ALL
    ];

    this.emitter = emitter;

    this.prepare();
  };

  prepare() {
    this.emitter.on('create-schedule', (content: string[][] | null, ctx, type) => {
      this.create(content, ctx, type);
    });

    this.emitter.on('get-schedule-messages', (type: string, messages: string[]) => {
      const scheduleMessages: string[] = this.getMessages(type);
      scheduleMessages.forEach(message => messages.push(message))
    })
  }

  createCases(): void {
    this.cases = this.cases.map(name => 
      new Case({
        name: typeof name === 'string' 
        ? name 
        : undefined,
        tasks: []
      })
    );
  };

  createTasks() {
    if (!this.content) return;
    const task = new Task();

    foreach(this.content, (_: any, item: any) => {
      if (Array.isArray(item)) {
        include(item, '2023').then(() => {
          task.data = item[0];
          task.name = item[5];
          task.month = item[1];
        });
    
        const isOrder = (item[0] && !item[1] && Number(item[0]));
        const isTime = (item[0].includes(':') && item[2].includes(':'));
        const toStrTime = (first: string , second: string) => [first, '/', second].join(' ');
    
        if (isOrder) { task.order = item[0] };
        if (isTime) { task.time = toStrTime(item[0], item[2]) };
        
        include(item, '_subject_').then(() => {
          task.description = arrToStr(item, (item: any) => item !== '_subject_');
        });
    
        include(item, '_place_').then(() => {
          task.place = arrToStr(item, (item: any) => item !== '_place_');
          const options: ITask = task.get();
          this.tasks.push(options);
        });
      }
    });
  }

  create(content: string[][] | null, ctx: any, type: any): void {
    this.clear();

    this.content = content;

    this.createCases();
    this.createTasks();

    this.tasks.forEach(task => {
      const name = translateName(task.name.toLowerCase());

      this.cases.forEach(event => {
        if (typeof event !== 'string') {
          if ((event.name === name) || (event.name === ALL)) {
            event.tasks.push(new Task(task));
          }
        }
      });
    });


    this.emitter.emit('show-schedule-messages', ctx, type);
  };


  findCase(name: string): ICase | void {
    for (const event of this.cases) {
      if (typeof event === 'string') return;
      if (event.name === name) return event;
    }
  };

  getMessages(type: string): string[] {
    const messages: string[] = [];

    for (const event of this.cases) {
      if (typeof event === 'string') {
        return messages;
      };
    
      if ((event.name === type) || (type === ALL)) {
        if (event.name === ALL) {
          return messages;
        };
        let message: string = event.name!.toUpperCase();

        event.tasks.forEach((task, item)=> {
          if (item === 0) message += ` - ${task.data} \n\n`
          message += task.toMessage();
          message += "\n";
        });

        messages.push(message);
      };
    };

    return messages;
  };

  private clear() {
    this.tasks = [];
    this.cases = [
      MONDAY,
      TUESDAY,
      WEDNESDAY,
      THURSDAY,
      FRIDAY,
      SATURDAY,
      ALL
    ];
  }
};