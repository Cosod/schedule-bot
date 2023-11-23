import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
export declare abstract class Command {
    bot: Telegraf<IBotContext>;
    abstract listeners: string[];
    constructor(bot: Telegraf<IBotContext>);
    abstract handle(): void;
}
