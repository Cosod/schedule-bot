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
exports.Browser = void 0;
const puppeteer_1 = require("puppeteer");
class Browser {
    constructor(url, parser, emitter) {
        this.url = url;
        this.parser = parser;
        this.emitter = emitter;
        this.prepare();
    }
    ;
    prepare() {
        this.emitter.on('start', (ctx, type) => { this.getContent(ctx, type); });
    }
    getContent(ctx, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const browser = yield puppeteer_1.default.launch({
                    headless: false,
                    ignoreHTTPSErrors: true,
                    executablePath: '/usr/bin/chromium-browser'
                });
                const page = yield browser.newPage();
                yield page.goto(this.url);
                yield this.parser.start(page);
                const content = this.parser.content;
                this.emitter.emit('create-schedule', content, ctx, type);
                yield page.close();
                yield browser.close();
                return content;
            }
            catch (err) {
                return console.log(err);
            }
        });
    }
}
exports.Browser = Browser;
