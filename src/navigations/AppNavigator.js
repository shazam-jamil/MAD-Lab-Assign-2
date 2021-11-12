import React from "react";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import SellStack from "./SellStack";
import FindStack from "./FindStack";

import MoreScreen from "../screens/MoreScreen";
import ChatScreen from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";

import colors from "../config/colors";
import MessageScreen from "../screens/MessageScreen";

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerTitleAlign: "center",
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: colors.primary,
    }}
  >
    <Tab.Screen
      name="Messages"
      component={MessageScreen}
      options={{
        headerShown: true,
        tabBarLabel: "Messages",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="message" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Home"
      component={FindStack}
      options={{
        tabBarLabel: "Find",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Sell"
      component={SellStack}
      options={{
        tabBarLabel: "Sell",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="usd" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Connect"
      component={MoreScreen}
      options={{
        headerShown: true,
        tabBarLabel: "Connect",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="smile" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Stack = createStackNavigator();
const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Back"
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="Back"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      // options={({ route }) => ({
      //   headerTitle: route.params.username,
      // })}
      options={{ headerTitle: "Chat" }}
    />

    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerTitle: "Login" }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerTitle: "Sign Up" }}
    />
    <Stack.Screen
      name="ForgetPassword"
      component={ForgetPasswordScreen}
      options={{ headerTitle: "Forgot Password" }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
