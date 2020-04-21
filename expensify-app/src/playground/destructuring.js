const person = {
  name: 'Andrew',
  age: 27,
  location: {
    city: 'Philadelphia',
    temp: 88
  }
}

// object destructruing、分割代入
const { name, age } = person
// const name = person.name
// const age = person.age
console.log(`${name} is ${age}.`)

// nestありの分割代入、別名
const { city, temp: temperature } = person.location
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}.`)
}

// 別名 && default値ありの分割代入
// const { name: firstName = 'Anonymous', age } = person
// console.log(`${firstName} is ${age}.`)

const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    // name: 'Penguin'
  }
}

const { name: publisherName = 'Self-Published' } = book.publisher
console.log(publisherName)