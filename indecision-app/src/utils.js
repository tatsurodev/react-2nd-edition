console.log('utils.js is running')

// named export
// 個別にexport
export const square = (x) => x * x

export const add = (a, b) => a + b

const subtract = (a, b) => a - b

// export defaultは変数宣言後に行う、
// 下記はerror
// export default const subtract = (a, b) => a - b
export default subtract
// 宣言と同時にexport defaultはおｋ
// export default (a, b) => a - b

// まとめてexport
// default exportは1つのみ
// export { square, add, subtract as default }
