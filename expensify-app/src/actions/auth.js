import { firebase, googleAuthProvider } from '../firebase/firebase'

export const startLogin = () => {
  return () => {
    // promiseをreturnすることでpromise chainが使用できる
    return firebase.auth().signInWithPopup(googleAuthProvider)
  }
}

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut()
  }
}
