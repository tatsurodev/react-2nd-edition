const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve({
    //   name: 'Andrew',
    //   age: 26
    // })
    // resolve, rejectは一度のみ
    // resolve('This is my other resolved data')
    // 引数は複数渡せない、複数dataを渡す必要がある時はobjectで渡す
    // resolve('This is my resolved data', 'other')

    reject('Something went wrong!')
  }, 1500)
})

console.log('before')
promise.then(data => {
  console.log('1', data)
}).catch(error => {
  console.log('error: ', error)
})
// thenの第二引数はerror handlerとしても使える。上下は同値
// promise.then(
//   data => {
//     console.log('1', data)
//   },
//   error => {
//     console.log('error: ', error)
//   })
console.log('after')

