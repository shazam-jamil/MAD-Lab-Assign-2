import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";

import colors from "../config/colors";

function AuthComponent({ title, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{title}</Text>

      <Button
        mode="contained"
        onPress={onPress}
        theme={{
          colors: { primary: colors.primary },
        }}
        style={styles.button}
      >
        login / sign up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  button: {
    borderRadius: 15,
  },
  description: {
    // textTransform: "capitalize",
    opacity: 0.8,
    color: colors.black,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },
});

export default AuthComponent;
