"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduletCommand = void 0;
const telegraf_1 = require("telegraf");
const command_class_1 = require("./command.class");
const constant_1 = require("../constant/constant");
const messages_1 = require("../messages/messages");
class ScheduletCommand extends command_class_1.Command {
    constructor(bot, emitter) {
        super(bot);
        this.emitter = emitter;
        this.listeners = [
            constant_1.MONDAY,
            constant_1.TUESDAY,
            constant_1.WEDNESDAY,
            constant_1.THURSDAY,
            constant_1.FRIDAY,
            constant_1.SATURDAY,
            constant_1.ALL
        ];
        this.buttons = [];
        this.prepare();
    }
    prepare() {
        this.emitter.on("show-schedule-messages", (ctx, type) => __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = [];
                this.emitter.emit("get-schedule-messages", type, messages);
                for (let index = 0; index < messages.length; index++) {
                    const message = messages[index];
                    if ((index === 0)) {
                        yield ctx.editMessageText(message);
                    }
                    else {
                        yield ctx.sendMessage(message);
                    }
                    ;
                }
            }
            catch (err) {
                yield ctx.editMessageText("попробуй еще разок");
            }
            ;
        }));
    }
    addListeners() {
        for (const listener of this.listeners) {
            this.buttons.push(telegraf_1.Markup.button.callback(listener, listener));
            this.addAction(listener);
        }
        ;
    }
    addAction(type) {
        this.bot.action(type, (ctx) => __awaiter(this, void 0, void 0, function* () {
            ctx.editMessageText(messages_1.WAITMESSAGE);
            this.emitter.emit('start', ctx, type);
        }));
    }
    handle() {
        this.bot.start((ctx) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (ctx.message.chat.type !== 'group') {
                    yield ctx.deleteMessage(ctx.message.message_id);
                }
                ;
                yield ctx.reply(".....................................................");
                yield ctx.reply("что тебе нужно?", telegraf_1.Markup.inlineKeyboard(this.buttons));
            }
            catch (err) {
                yield ctx.reply("тупой бот: долгое бездействие -> нет ответа, обновите");
            }
        }));
        this.addListeners();
    }
}
exports.ScheduletCommand = ScheduletCommand;
