/// <reference types="node" />
/// <reference types="node" />
import { Parser } from "../parser/parser.class";
import { EventEmitter } from "stream";
export declare class Browser {
    private url;
    private parser;
    private emitter;
    constructor(url: string, parser: Parser, emitter: EventEmitter);
    prepare(): void;
    getContent(ctx: any, type: any): void;
}
