class Person {
  constructor(name = 'Anonymous', age = 0) {
    // 上記の引数でのdefault nameの設定方法は、下記と同値
    // this.name = name || 'Anonymous'
    this.name = name
    this.age = age
  }

  getGreeting() {
    // return 'Hi, I am ' + this.name + '!'
    return `Hi, I am ${this.name}!`
  }

  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`
  }
}

const me = new Person('Andrew Mead', 26)
console.log(me.getGreeting(), me.getDescription())

const other = new Person()
console.log(other.getGreeting(), other.getDescription())