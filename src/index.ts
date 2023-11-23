import { Telegraf } from "telegraf";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import EventEmitter = require("events");
import { ScheduletCommand } from "./commands/schedule.command";
import { Command } from "./commands/command.class";
import { SpamCommand } from "./commands/spam.command";
import { Browser } from "./components/browser/browser";
import { Parser } from "./components/parser/parser";
import { Schedule } from "./components/schedule/schedule.class";

const LocalSession = require("telegraf-session-local");


class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];
  emitter: EventEmitter;

  constructor(
    private readonly configService: IConfigService,
    eventEmitter: EventEmitter,
  ) {
    this.bot = new Telegraf<IBotContext>(
      this.configService.get("TOKEN")
    );

    this.bot.use(new LocalSession({
      database: configService.get("DATA_BASE_NAME") + ".json"
    }).middleware());

    this.emitter = eventEmitter;
  }

  init() {
    new Schedule(this.emitter);
    new Browser(
      this.configService.get("SITE"),
      new Parser(),
      this.emitter
    );

    this.commands = [
      new ScheduletCommand(this.bot, this.emitter),
      new SpamCommand(this.bot)
    ];

    this.commands.forEach(command => command.handle())

    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService(), new EventEmitter());
bot.init();