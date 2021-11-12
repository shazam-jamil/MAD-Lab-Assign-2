import React, { useState } from "react";
import { Alert, View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import firebase from "firebase";

import colors from "../config/colors";

function ForgetPasswordScreen({}) {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setLoading(true);

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          "Note !!",
          "Please check your e-mail, check your junk mail box"
        )
      )
      .catch((error) => {
        Alert.alert("Error !!", error.message);
      });

    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputs}>
        <Text style={styles.message}>
          If the email matches an account, you will receive a recovery email
        </Text>

        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(password) => setEmail(password)}
          placeholder="Enter your email"
          keyboardType="email-address"
          theme={{
            colors: { primary: colors.primary },
          }}
          style={{ backgroundColor: colors.white, marginBottom: 40 }}
        />

        <Button
          mode="contained"
          loading={loading}
          onPress={handleSubmit}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          Send email
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 15,
  },
  message: {
    marginVertical: 40,
    fontSize: 20,
    textAlign: "center",
    width: "90%",
    color: colors.primary,
    alignSelf: "center",
  },
});

export default ForgetPasswordScreen;
