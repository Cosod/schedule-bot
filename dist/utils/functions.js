"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrToStr = exports.include = exports.foreach = void 0;
function foreach(arr, cb) {
    for (let iter = 0; iter < arr.length; iter++) {
        cb(arr, arr[iter], iter);
    }
}
exports.foreach = foreach;
function include(arr, value) {
    for (let iter = 0; iter < arr.length; iter++) {
        if (arr[iter] === value)
            return {
                then: (cb) => cb()
            };
    }
    ;
    return { then: () => { } };
}
exports.include = include;
function arrToStr(arr, condition) {
    const sum = [];
    for (let iter = 0; iter < arr.length; iter++) {
        if (!condition(arr[iter]))
            continue;
        sum.push(arr[iter]);
    }
    ;
    return sum.join(' ');
}
exports.arrToStr = arrToStr;
