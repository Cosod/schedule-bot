import { Context } from "telegraf";
export interface SessionData {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    all: boolean;
}
export interface IBotContext extends Context {
    session: SessionData;
}
