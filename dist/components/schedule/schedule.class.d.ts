/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from "stream";
import { ICase } from "./cases.interface";
export declare class Schedule {
    private content;
    private cases;
    private tasks;
    emitter: EventEmitter;
    constructor(emitter: EventEmitter);
    prepare(): void;
    createCases(): void;
    createTasks(): void;
    create(content: string[][] | null, ctx: any, type: any): void;
    findCase(name: string): ICase | void;
    getMessages(type: string): string[];
    private clear;
}
