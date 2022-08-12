import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyByPoeWhQtqjn1gZ_Bobg9uHPHoq5UfcYk",
  authDomain: "league-skill-issue.firebaseapp.com",
  projectId: "league-skill-issue",
  storageBucket: "league-skill-issue.appspot.com",
  messagingSenderId: "205982962159",
  appId: "1:205982962159:web:dc37af54a61e4129d7a61a",
  measurementId: "G-XNM7NS09ZS",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
