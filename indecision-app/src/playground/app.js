// const obj = {
//   name: 'Vikram',
//   getName() {
//     return this.name
//   }
// }

// 通常のfunction内ではthisは、use strictの時undefined, それ以外の時window objectを指す
// const func = function () {
//   console.log(this)
// }
// func()

// const getNameは、obj.getNameを参照する只の関数になってしまったのでthis.nameのthisはobjではなく、windowもしくはundefinedとなる。よってgetNameをエラーなく作動させるには、bindでthisを指し示すものを指定するしかない
// error例
// const getName = obj.getName
// console.log(getName())
// ok例
// const getName = obj.getName.bind({ name: 'Andrew' })
// console.log(getName())

