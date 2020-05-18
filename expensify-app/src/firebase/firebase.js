import * as firebase from 'firebase'
const { FIREBASE_API_KEY } = process.env

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "expensify-3bd22.firebaseapp.com",
  databaseURL: "https://expensify-3bd22.firebaseio.com",
  projectId: "expensify-3bd22",
  storageBucket: "expensify-3bd22.appspot.com",
  messagingSenderId: "387024752558",
  appId: "1:387024752558:web:a1b034d9753e71f42a823f",
  measurementId: "G-ZL7M0Y2P5M"
}

firebase.initializeApp(firebaseConfig)

const database = firebase.database()
// refを指定しない時、root refを取得する
database.ref().set({
  name: 'Andrew Mead',
  age: 26,
  isSingle: false,
  location: {
    city: 'Philadelphoa',
    country: 'United States'
  }
})

// root refなので全てを書き換えてしまう
// database.ref().set('This is my data.')

database.ref('age').set(27)
database.ref('location/city').set('New York')
database.ref('attributes').set({
  height: 73,
  weight: 150
})