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

/*
database
  .ref()
  .once('value')
  .then(snapshot => {
    const val = snapshot.val()
    console.log(val)
  })
  .catch(e => {
    console.log('Error fetching data', e)
  })
*/

/*
// subscriptionのcallbackを作成、on, offで使用
const onValueChange = snapshot => {
  console.log(snapshot.val())
}
database.ref().on('value', onValueChange)
setTimeout(() => {
  database.ref('age').set(29)
}, 3500)
setTimeout(() => {
  // offに引数を指定しない場合、refの全subscriptionが削除される
  database.ref().off(onValueChange)
}, 7000)
setTimeout(() => {
  database.ref('age').set(30)
}, 10500)
*/

/*
// onで返ってくるのはonで指定したcallbackなのでそれを変数に保存し、offでunsubscribeする。第一引数はevent, 第二引数は成功時のcallback, 第三引数は失敗時のcallback。onの第二、第三引数の代わりにthen, catchが使えそうだが, promiseは一度resolve, rejectされると再利用できないため、snapshotが変わる度実行する必要があるようなsubscriptionには使えないのでonの引数でcallbackを指定している
const onValueChange = database.ref().on('value',
  snapshot => {
    console.log(snapshot.val())
  },
  e => {
    console.log('Error with data fetching', e)
  }
)
setTimeout(() => {
  database.ref('age').set(29)
}, 3500)
setTimeout(() => {
  database.ref().off(onValueChange)
}, 7000)
setTimeout(() => {
  database.ref('age').set(30)
}, 10500)
*/

database.ref().on(
  'value',
  snapshot => {
    const val = snapshot.val()
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`)
  }
)


/*
// refを指定しない時、root refを取得する。setはpromiseをreturn
database.ref().set({
  name: 'Andrew Mead',
  age: 26,
  stressLevel: 6,
  job: {
    title: 'Software developer',
    company: 'Google'
  },
  location: {
    city: 'Philadelphoa',
    country: 'United States'
  }
}).then(() => {
  console.log('Data is saved!')
}).catch(e => {
  console.log('This is failed. ', e)
})
*/

// root refなので全てを書き換えてしまう
// database.ref().set('This is my data.')

/*
database.ref('age').set(27)
database.ref('location/city').set('New York')
database.ref('attributes').set({
  height: 73,
  weight: 150
}).then(() => {
  console.log('Second set call worked.')
}).catch(e => {
  console.log('Things didn\'t work for the second error.')
})
*/

/*
// updateでpropertyの更新、追加、削除が可能
database.ref().update({
  name: 'Mike',
  age: 29,
  // 新しいpropertyの追加で新たにproperty追加
  job: 'Software developer',
  // nullでpropertyの削除
  isSingle: null
})
*/

/*
database.ref().update({
  job: 'Manager',
  // location全部が更新されcountryがなくなる
  // location: {
  //   city: 'Boston'
  // },
  // locationのcityのみ更新
  'location/city': 'Boston',
})
*/

/*
database.ref().update({
  stressLevel: 9,
  'job/company': 'Amazon',
  'location/city': 'Seattle'
})
*/

// database.ref('isSingle')
//   .remove()
//   .then(() => {
//     console.log('Data was removed')
//   })
//   .catch(e => {
//     console.log('Did not remove data', e)
//   })
// set(null)はremove()と同値
// database.ref('isSingle').set(null)