import React from "react";
import { View, StyleSheet } from "react-native";

function Seperator({ style }) {
  return <View style={[styles.container, style]} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkgrey",
    height: 0.8,
    width: "100%",
  },
});

export default Seperator;
