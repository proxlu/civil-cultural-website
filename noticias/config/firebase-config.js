// config/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// 🔥 Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAMZnxiUL9SIlSNj5cqFFzfmFjVZYUCky4",
    authDomain: "civil-cultural-b08ec.firebaseapp.com",
    projectId: "civil-cultural-b08ec",
    storageBucket: "civil-cultural-b08ec.firebasestorage.app",
    messagingSenderId: "336278547555",
    appId: "1:336278547555:web:a03bca9edb76ffe0085c56",
    measurementId: "G-V341N6T273"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);