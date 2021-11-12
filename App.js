import React, { useState, useEffect } from "react";
import { LogBox, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";

import AppNavigator from "./src/navigations/AppNavigator";
import NavigationTheme from "./src/navigations/NavigationTheme";

const firebaseConfig = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyB2XirJs8EJYQHojfwt2q1ZodZydJHm_BQ",
    authDomain: "dollarpage-bb53f.firebaseapp.com",
    databaseURL: "https://dollarpage-bb53f-default-rtdb.firebaseio.com",
    projectId: "dollarpage-bb53f",
    storageBucket: "dollarpage-bb53f.appspot.com",
    messagingSenderId: "123181439974",
    appId: "1:123181439974:web:ff530f6da8a6da4003d427",
  });
};

export default function App() {
  const [isLogged, setIsLogged] = useState(false);


  useEffect(() => {
    if (!firebase.app.length) firebaseConfig();
  }, []);

  return (
    <StateProvider
      isLogged={isLogged}
      setIsLogged={setIsLogged}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </StateProvider>
  );
}
