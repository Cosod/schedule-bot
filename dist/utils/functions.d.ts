export declare function foreach(arr: any[] | string[][], cb: Function): void;
export declare function include(arr: any[], value: any): {
    then: (cb: Function) => any;
};
export declare function arrToStr(arr: any[], condition: Function): string;
