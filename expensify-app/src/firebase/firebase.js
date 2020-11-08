import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

export { firebase, database as default }

/*
database
  .ref('expenses')
  .once('value')
  .then(snapshot => {
    const expenses = []
    snapshot.forEach(
      // childSnapshot => {処理} をchildSnapshot => 処理 にしてしまうとreturnしてしまうことになりfirebaseのforEach methodが全て回る前に修了してしまうので注意
      childSnapshot => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      }
    )
    console.log(expenses)
  })
*/

/*
// firebaseのexpensesが更新される度、local js上のexpensesも更新
database
  .ref('expenses')
  .on(
    'value',
    snapshot => {
      const expenses = []
      snapshot.forEach(childSnapshot => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      console.log(expenses)
    }
  )
*/

/*
// onに使用できる削除系event, child_removed
database
  .ref('expenses')
  .on(
    'child_removed',
    snapshot => {
      console.log(snapshot.key, snapshot.val())
    }
  )

// 更新系event, child_changed
database
  .ref('expenses')
  .on(
    'child_changed',
    snapshot => {
      console.log(snapshot.key, snapshot.val())
    }
  )

// 追加系event, child_added。listenした時点での全dataとその後追加dataがある度呼ばれる
database
  .ref('expenses')
  .on(
    'child_added',
    snapshot => {
      console.log(snapshot.key, snapshot.val())
    }
  )
*/

/*
// firebaseは配列型に対応していない
const notes = [
  {
    id: '12',
    title: 'First note!',
    body: 'This is my note'
  },
  {
    id: '761ase',
    title: 'Another note',
    body: 'This is my note'
  }
]
// 配列型は下記のようなobject形式に変換され保存される
const firebaseNotes = {
  notes: {
    fhdsuafhjka: {
      title: 'First note!',
      body: 'This is my note'
    },
    fdjkdajflki: {
      title: 'Another note',
      body: 'This is my note'
    }
  }
}
database.ref('notes').set(notes)
database.ref('notes/12')
*/

/*
// idを自動的にfirebaseに生成させるにはpushを使用する
database.ref('notes').push(
  {
    title: 'Course Topics',
    body: 'React Native, Angular, Python'
  }
)
*/

// idをrefに指定して操作
// database.ref('notes/-M7flh244fzKmEyPrr8d').remove()

/*
database.ref('expenses').push({
  description: 'Rent',
  note: '',
  amount: 109500,
  createdAt: 4382943829
})
database.ref('expenses').push({
  description: 'Phone bill',
  note: '',
  amount: 5900,
  createdAt: 4384543759
})
database.ref('expenses').push({
  description: 'Food',
  note: '',
  amount: 1200,
  createdAt: 4332893849
})
*/

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

/*
database.ref().on(
  'value',
  snapshot => {
    const val = snapshot.val()
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`)
  }
)
*/

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

/*
database.ref('isSingle')
  .remove()
  .then(() => {
    console.log('Data was removed')
  })
  .catch(e => {
    console.log('Did not remove data', e)
  })
set(null)はremove()と同値
database.ref('isSingle').set(null)
*/
