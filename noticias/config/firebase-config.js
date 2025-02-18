// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAMZnxiUL9SIlSNj5cqFFzfmFjVZYUCky4",
    authDomain: "civil-cultural-b08ec.firebaseapp.com",
    projectId: "civil-cultural-b08ec",
    storageBucket: "civil-cultural-b08ec.firebasestorage.app",
    messagingSenderId: "336278547555",
    appId: "1:336278547555:web:6ac35e9c09daf24d085c56",
    measurementId: "G-3516BGMR16"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
