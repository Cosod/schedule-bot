"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
class Case {
    constructor(options) {
        this.name = options ? (options.name || '') : '';
        this.tasks = options ? options.tasks : [];
    }
}
exports.Case = Case;
