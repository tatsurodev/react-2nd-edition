var nameVar = 'Andrew'
var nameVar = 'Mike'
console.log('nameVar', nameVar)

// 再定義不可
let nameLet = 'Jen'
nameLet = 'Julie'
console.log('nameLet', nameLet)

// 再定義、再代入不可
const nameConst = 'Frank'
console.log('nameConst', nameConst)

// function scope
function getPetName() {
  // var, let, constはfunctionの外からはaccessできない
  var petName = 'Hal'
  return petName
}
getPetName()
// console.log(petName)

// block scope
// let, constは同一の{}内とparent scopedで定義された変数にchild scopeからaccessable
const fullName = 'Jen Mead'
let firstName
if (fullName) {
  firstName = fullName.split(' ')[0]
  console.log(firstName)
}
console.log(firstName)
