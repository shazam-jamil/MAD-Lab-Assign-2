import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  Dimensions,
  Linking,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

import colors from "../config/colors";
import useAuthentication from "../hooks/useAuthentication";
import TextWithTouchable from "../components/TextWithTouchable";
import CheckboxWithDesc from "../components/CheckboxWithDesc";

function RegisterScreen({ route }) {
  const { register } = useAuthentication();
  const { onAuth } = route.params;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(true);

  const message =
    "Convert your books into CASH! " +
    "\nSell books you've read to others locally. " +
    "\nBuy used books locally. " +
    "\nZero commission, No shipping cost";

  const handleSubmit = () => {
    if (!email || !password || !username) return;

    setLoading(true);
    register({ email, password, username }, setLoading, onAuth);
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
          style={styles.TextInput}
          theme={{
            colors: { primary: colors.primary },
          }}
        />

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Enter your Password"
          secureTextEntry
          style={styles.TextInput}
          theme={{
            colors: { primary: colors.primary },
          }}
        />

        <TextInput
          mode="outlined"
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Enter your username"
          style={styles.TextInput}
          theme={{
            colors: { primary: colors.primary },
          }}
        />

        <CheckboxWithDesc
          status={isAgree}
          fontSize={14}
          descriptionComp={
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <TextWithTouchable
                description="I agree to "
                touchableDescription="privacy policy"
                handlePress={() =>
                  Linking.openURL(
                    "https://dollarpageapp.com/home/privacy-policy"
                  )
                }
              />

              <TextWithTouchable
                description=" and "
                touchableDescription="terms and conditions"
                handlePress={() =>
                  Linking.openURL(
                    "https://dollarpageapp.com/terms-and-conditions"
                  )
                }
              />
            </View>
          }
          handlePress={() => {
            setIsAgree(!isAgree);
          }}
        />

        <Button
          mode="contained"
          loading={loading}
          disabled={!isAgree}
          onPress={handleSubmit}
          style={styles.button}
          theme={{
            colors: { primary: colors.primary },
          }}
        >
          register
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
  button: {
    borderRadius: 15,
    marginVertical: 20,
  },
  inputs: {},
  topTitle: {
    fontSize: 20,
    color: colors.primary,
    textAlign: "center",
  },
  TextInput: {
    backgroundColor: colors.white,
    marginBottom: 10,
  },
});

export default RegisterScreen;
