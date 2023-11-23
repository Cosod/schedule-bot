import { Page } from "puppeteer";
export interface IParser {
    start(page: Page): void;
}
