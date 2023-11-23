import { Telegraf, Markup } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { FRIDAY, MONDAY, SATURDAY, THURSDAY, TUESDAY, WEDNESDAY, ALL } from "../constant/constant";
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";
import { EventEmitter } from "stream";
import { WAITMESSAGE } from "../messages/messages";


export class ScheduletCommand extends Command {
  public listeners: string[];
  buttons: InlineKeyboardButton[];
  emitter: EventEmitter;
  
  constructor(
    bot: Telegraf<IBotContext>,  
    emitter: EventEmitter
    ) {
    super(bot);
    this.emitter = emitter;

    this.listeners = [
      MONDAY,
      TUESDAY,
      WEDNESDAY,
      THURSDAY,
      FRIDAY,
      SATURDAY,
      ALL 
    ];
    this.buttons = [];

    this.prepare();
  }

  prepare() {
      this.emitter.on("show-schedule-messages", async (ctx, type) => {
        try {
          const messages: string[] = [];

          this.emitter.emit("get-schedule-messages", type, messages);
    
          for (let index = 0; index < messages.length; index++) {
            const message = messages[index];
    
            if ((index === 0)) {
              await ctx.editMessageText(message)
            } else {
              await ctx.sendMessage(message);
            };
          }
        } catch (err) {
          await ctx.editMessageText("попробуй еще разок");
        };
    });
  }

  addListeners() {
    for (const listener of this.listeners) {
      this.buttons.push(Markup.button.callback(listener, listener));
      this.addAction(listener);
    };
  }

  addAction(type: string): void {
    this.bot.action(type, async (ctx) => {
      ctx.editMessageText(WAITMESSAGE);

      this.emitter.emit('start', ctx, type);
    });
  }

  handle(): void {
    this.bot.start(async (ctx) => {
      try {
        if (ctx.message.chat.type !== 'group') {
          await ctx.deleteMessage(ctx.message.message_id);
        };
        await ctx.reply(".....................................................");
        await ctx.reply("что тебе нужно?", Markup.inlineKeyboard(this.buttons));
      } catch (err) {
        await ctx.reply("тупой бот: долгое бездействие -> нет ответа, обновите");
      }
    });

    this.addListeners();
  }
}