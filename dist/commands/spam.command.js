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
exports.SpamCommand = void 0;
const filters_1 = require("telegraf/filters");
const command_class_1 = require("./command.class");
class SpamCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.listeners = [];
    }
    handle() {
        this.bot.on((0, filters_1.message)('text'), (ctx) => __awaiter(this, void 0, void 0, function* () {
            if (ctx.chat.type !== 'group') {
                yield ctx.deleteMessage(ctx.message.message_id);
            }
        }));
    }
}
exports.SpamCommand = SpamCommand;
