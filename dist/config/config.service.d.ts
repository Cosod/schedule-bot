import { IConfigService } from "./config.interface";
export declare class ConfigService implements IConfigService {
    private config;
    constructor();
    get(key: string): string;
}
