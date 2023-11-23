import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
export declare class StartCommand extends Command {
    listeners: string[];
    constructor(bot: Telegraf<IBotContext>);
    handle(): void;
}
