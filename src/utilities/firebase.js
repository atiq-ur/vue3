import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDd8Bj_c-Sbr27P3vrXn-hO9cjNGIgWTiw",
    authDomain: "vue3-basic.firebaseapp.com",
    projectId: "vue3-basic",
    storageBucket: "vue3-basic.appspot.com",
    messagingSenderId: "442085656451",
    appId: "1:442085656451:web:89084983a633cb968bd8b6"
};
firebase.initializeApp(firebaseConfig);
export default firebase;