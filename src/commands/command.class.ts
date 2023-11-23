import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";

export abstract class Command {
  abstract listeners: string[];
  constructor(public bot: Telegraf<IBotContext>) {};
  abstract handle(): void;
}
