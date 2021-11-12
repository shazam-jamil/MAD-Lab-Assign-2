import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

import colors from "../config/colors";
import useAuthentication from "../hooks/useAuthentication";

function LoginScreen({ navigation, route }) {
  const { logIn } = useAuthentication();
  const { onAuth } = route.params;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const message =
    "Convert your books into CASH! " +
    "\nSell books you've read to others locally. " +
    "\nBuy used books locally. " +
    "\nZero commission, No shipping cost";

  const handleSubmit = () => {
    if (!email || !password) return;
    setLoading(true);
    logIn(email, password, setLoading, onAuth);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginVertical: 40 }}>
        <Text style={styles.topTitle}>{message}</Text>
      </View>

      <View style={styles.inputs}>
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
          style={styles.TextInput}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Enter your Password"
          style={styles.TextInput}
          secureTextEntry
          theme={{
            colors: { primary: colors.primary },
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgetPassword")}
          style={{ alignSelf: "flex-end", right: 10 }}
        >
          <Text style={styles.forgettext}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <Button
          mode="contained"
          loading={loading}
          onPress={handleSubmit}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          log in
        </Button>

        <Text style={styles.or}>OR</Text>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate("Register", { onAuth: onAuth })}
          theme={{
            colors: { primary: colors.primary },
          }}
          style={[styles.button, { borderWidth: 0.8 }]}
        >
          sign up
        </Button>
      </View>

      <View style={styles.bottomContainer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    height:
      Platform.OS == "android" ? 0 : Dimensions.get("screen").height * 0.4,
    width: 10,
  },
  buttons: {
    marginVertical: 20,
  },
  button: {
    borderRadius: 15,
  },
  inputs: {
    height: 180,
    justifyContent: "space-evenly",
  },
  TextInput: {
    backgroundColor: colors.white,
  },
  forgettext: {
    fontSize: 16,
    color: colors.primary,
  },
  or: {
    marginVertical: 10,
    fontSize: 16,
    color: "grey",
    alignSelf: "center",
  },
  topTitle: {
    fontSize: 20,
    // fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
});

export default LoginScreen;
