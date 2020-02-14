'use strict';

// arrow functionでは、arguments objectにaccessできない
var add = function add(a, b) {
  // console.log(arguments)
  return a + b;
};
console.log(add(55, 1));

// this keyword
var user = {
  name: 'Andrew',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived: function printPlacesLived() {
    var _this = this;

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
    return this.cities.map(function (city) {
      return _this.name + ' has lived in ' + city;
    });
  }
};
console.log(user.printPlacesLived());

var multiplier = {
  numbers: [10, 20, 30],
  multiplyBy: 3,
  multiply: function multiply() {
    var _this2 = this;

    return this.numbers.map(function (number) {
      return number * _this2.multiplyBy;
    });
  }
};
console.log(multiplier.multiply());
