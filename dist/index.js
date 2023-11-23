"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const config_service_1 = require("./config/config.service");
const EventEmitter = require("events");
const schedule_command_1 = require("./commands/schedule.command");
const spam_command_1 = require("./commands/spam.command");
const browser_1 = require("./components/browser/browser");
const parser_1 = require("./components/parser/parser");
const schedule_class_1 = require("./components/schedule/schedule.class");
const LocalSession = require("telegraf-session-local");
class Bot {
    constructor(configService, eventEmitter) {
        this.configService = configService;
        this.commands = [];
        this.bot = new telegraf_1.Telegraf(this.configService.get("TOKEN"));
        this.bot.use(new LocalSession({
            database: configService.get("DATA_BASE_NAME") + ".json"
        }).middleware());
        this.emitter = eventEmitter;
    }
    init() {
        new schedule_class_1.Schedule(this.emitter);
        new browser_1.Browser(this.configService.get("SITE"), new parser_1.Parser(), this.emitter);
        this.commands = [
            new schedule_command_1.ScheduletCommand(this.bot, this.emitter),
            new spam_command_1.SpamCommand(this.bot)
        ];
        this.commands.forEach(command => command.handle());
        this.bot.launch();
    }
}
const bot = new Bot(new config_service_1.ConfigService(), new EventEmitter());
bot.init();
