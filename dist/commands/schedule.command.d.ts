/// <reference types="node" />
/// <reference types="node" />
import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";
import { EventEmitter } from "stream";
export declare class ScheduletCommand extends Command {
    listeners: string[];
    buttons: InlineKeyboardButton[];
    emitter: EventEmitter;
    constructor(bot: Telegraf<IBotContext>, emitter: EventEmitter);
    prepare(): void;
    addListeners(): void;
    addAction(type: string): void;
    handle(): void;
}
