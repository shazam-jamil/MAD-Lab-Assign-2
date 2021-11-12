import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  ImageBackground,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { TextInput, Button } from "react-native-paper";
import firebase from "firebase";
import * as Notifications from "expo-notifications";

import colors from "../config/colors";
import { useUser } from "../hooks/useUser";

function HomeScreen({ navigation }) {
  const [input, setInput] = useState("");
  const [college, setCollege] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { isIntroRequired, setIsIntroRequired } = useUser();

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  let result = [];

  useEffect(() => {
    if (!isIntroRequired) registerForPushNotificationsAsync();
  }, [isIntroRequired]);

  useEffect(() => {
    try {
      Notifications.getPermissionsAsync().then(({ status }) => {
        if (status !== "granted") {
          if (
            lastNotificationResponse &&
            lastNotificationResponse.actionIdentifier ===
              Notifications.DEFAULT_ACTION_IDENTIFIER
          ) {
            navigation.navigate("Messages");
          }
        }
      });
    } catch (error) {}
  }, [lastNotificationResponse]);

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      if (existingStatus !== "granted") {
        Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
          },
        }).then(({ status }) => {
          if (status !== "granted") return;
        });
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    } catch (error) {}
  };

  const theme = {
    colors: { primary: colors.primary },
  };

  const handleFind = () => {
    if (loading) return;
    if (!input) return setError(true);
    setLoading(true);
    result = [];

    // returns true if the variable does NOT contain a valid ISBN
    const queryfor = isNaN(input) ? "title" : "isbn";

    if (!college) {
      firebase
        .firestore()
        .collection("books")
        .where(queryfor, "==", input.toLowerCase())
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((book) => {
              result.push({ ...book.data(), bookID: book.id });
            });

            navigation.navigate("Available", {
              result: result,
            });
          } else {
            Alert.alert(
              "No Book Found!!",
              "Try search using the book ISBN number"
            );
          }
        })
        .catch(() =>
          Alert.alert(
            "Error!!",
            "Something went wrong, please try again later."
          )
        )
        .finally(() => {
          setLoading(false);
        });
    } else {
      firebase
        .firestore()
        .collection("books")
        .where(queryfor, "==", input.toLowerCase())
        .where("college", "==", college.toLowerCase())
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((book) => {
              result.push({ ...book.data(), bookID: book.id });
            });

            navigation.navigate("Available", {
              result: result,
            });
          } else {
            Alert.alert(
              "No Result!!",
              `No book found with ${
                queryfor == "isbn" ? "ISBN" : "title"
              } "${input}"`
            );
          }
        })
        .catch(() =>
          Alert.alert(
            "Error!!",
            "Something went wrong, please try again later."
          )
        )
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      {isIntroRequired ? (
        <ImageBackground
          source={require("../assets/intro.png")}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        >
          <Button
            mode="contained"
            onPress={() => setIsIntroRequired(false)}
            theme={{
              colors: { primary: colors.primary },
            }}
            style={{
              alignSelf: "center",
              borderRadius: 15,
              bottom: Dimensions.get("screen").height * 0.13,
              position: "absolute",
              width: "70%",
            }}
          >
            get started
          </Button>
        </ImageBackground>
      ) : (
        <ScrollView style={styles.container}>
          <StatusBar style="light" />

          <View style={styles.textFieldContainer}>
            <TextInput
              mode="outlined"
              label={"Exact Book Title or ISBN *"}
              value={input}
              onChangeText={(text) => setInput(text)}
              error={error && !input}
              keyboardType="default"
              placeholder={"Enter exact book title or ISBN number"}
              style={styles.textField}
              theme={theme}
            />

            <TextInput
              mode="outlined"
              label="College or high school (narrow search)"
              value={college}
              onChangeText={(text) => setCollege(text)}
              placeholder="Enter college or high school"
              style={styles.textField}
              theme={theme}
            />

            <Button
              mode="contained"
              onPress={handleFind}
              style={styles.button}
              loading={loading}
              icon="magnify"
              theme={theme}
            >
              Search
            </Button>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 15,
    width: "60%",
    alignSelf: "center",
    marginTop: 20,
  },
  textField: {
    backgroundColor: colors.white,
  },
  textFieldContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    height: 250,
    justifyContent: "space-evenly",
  },
});

export default HomeScreen;
