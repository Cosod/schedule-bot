export function foreach(arr: any[] | string[][], cb: Function) {
  for (let iter = 0; iter < arr.length; iter++) {
    cb(arr, arr[iter], iter);
  }
}

export function include(arr: any[], value: any) {
  for (let iter = 0; iter < arr.length; iter++) {
    if (arr[iter] === value) return {
      then: (cb: Function) => cb()
    };
  };

  return { then: () => {} }
}

export function arrToStr(arr: any[], condition: Function) {
  const sum = [];
  for (let iter = 0; iter < arr.length; iter++) {
    if (!condition(arr[iter])) continue;
    sum.push(arr[iter])
  };
  return sum.join(' ');
}