import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCzDz6ZhwAsaz3qqRCXruOs2vi6mMlWi5g",
    authDomain: "todoapp-d6f2a.firebaseapp.com",
    projectId: "todoapp-d6f2a",
    storageBucket: "todoapp-d6f2a.appspot.com",
    messagingSenderId: "609376512781",
    appId: "1:609376512781:web:370100a76fdc75e77fde44"
};



let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
export const createUserDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = db.doc(`users/${user.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email } = user;
        const { displayName } = additionalData;

        try {
            await userRef.set({
                displayName,
                email,
                createdAt: new Date(),
            });
        } catch (error) {
            console.log('Error in creating user', error);
        }
    }
};
