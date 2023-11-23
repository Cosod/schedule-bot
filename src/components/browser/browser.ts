import puppetter from "puppeteer";
import { Parser } from "../parser/parser";
import { EventEmitter } from "stream";

export class Browser {
  private url: string;
  private parser: Parser;
  private emitter: EventEmitter;

  constructor(url: string, parser: Parser, emitter: EventEmitter) {
    this.url = url;
    this.parser = parser;
    this.emitter = emitter;

    this.prepare();
  };

  prepare() {
    this.emitter.on('start', (ctx, type) => { this.getContent(ctx, type) });
  }

  getContent(ctx: any, type: any) {
    (async () => {
      try {
        const browser = await puppetter.launch({
          headless: false,
          ignoreHTTPSErrors: true
        });
    
        const page = await browser.newPage();
        await page.goto(this.url);
    
        await this.parser.start(page);
        const content: string[][] | null = this.parser.content;
  
        this.emitter.emit('create-schedule', content, ctx, type);
    
        await page.close();
        await browser.close();
  
        return content;
      } catch (err) {
        return null;
      }
    })()
  }
}