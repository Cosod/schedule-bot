import { Page } from "puppeteer";
import { IParser } from "./parser.interface";
export declare class Parser implements IParser {
    content: string[][] | null;
    constructor();
    start(page: Page): Promise<void>;
}
