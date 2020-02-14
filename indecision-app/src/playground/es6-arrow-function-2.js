// arrow functionでは、arguments objectにaccessできない
const add = (a, b) => {
  // console.log(arguments)
  return a + b
}
console.log(add(55, 1))

// this keyword
const user = {
  name: 'Andrew',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived() {
    // このmethodのthisはuser objectを指す
    // console.log(this.name)
    // console.log(this.cities)
    // 無名関数内のthisは常にundefined
    // arrow function内のthisはparentのthisと一緒
    // this.cities.forEach((city) => {
    //   // console.log(this)
    //   console.log(this.name + ' has lived in ' + city)
    // })
    // mapは写像、forEachは何も返さない
    return this.cities.map(city => this.name + ' has lived in ' + city)

  }
}
console.log(user.printPlacesLived())

const multiplier = {
  numbers: [10, 20, 30],
  multiplyBy: 3,
  multiply() {
    return this.numbers.map(number => number * this.multiplyBy)
  }
}
console.log(multiplier.multiply())