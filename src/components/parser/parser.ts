import { Page } from "puppeteer";
import { IParser } from "./parser.interface"

export class Parser implements IParser {
  content: string[][] | null;

  constructor() {
    this.content = null;
  };

  async start(page: Page): Promise<void> {
    try {
      this.content = await page.evaluate(() => {
        const text: string[][] = [];
  
        const elements = document.querySelectorAll('td');
  
        elements.forEach(el => {
          const spans = el.querySelectorAll('span');
          
          if (spans.length === 0) {
            const str: string[] = el.textContent
              ? el.textContent.split(' ')
              : ['undefined'];
  
            text.push(str)
          };
  
          if (spans.length > 0) {
            spans.forEach((el, index) => {
              const str: string[] = el.textContent
                ? el.textContent.split(' ')
                : ['undefined'];
  
              if (index === 0) str.push('_subject_');
              if (index === 2) str.push('_place_');
              text.push(str)
            });
          };
        });
  
        return Array.from(text);
      });
    } catch (err) {
      this.content = null
    };
  }
}