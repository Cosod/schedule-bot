import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";


export class SpamCommand extends Command {
  public listeners: string[]; 
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
    this.listeners = [];
  }

  handle(): void {
    this.bot.on(message('text'), async (ctx) => {
      if (ctx.chat.type !== 'group') {
        await ctx.deleteMessage(ctx.message.message_id);
      }
    })
  }
}