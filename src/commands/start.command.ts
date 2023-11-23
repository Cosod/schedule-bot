import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";


export class StartCommand extends Command {
  public listeners: string[]; 
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
    this.listeners = [];
  }

  handle(): void {
    this.bot.start(async (ctx) => {
      console.log(ctx);
      ctx.reply("Привет! чтобы узнать расписание напиши: рас")
    })
  }
}