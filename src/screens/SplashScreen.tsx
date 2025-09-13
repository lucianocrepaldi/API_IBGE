import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/splash.png")} style={styles.logo} />
      <Text style={styles.title}>PAMII – IBGE</Text>
      <ActivityIndicator size="large" style={styles.spinner} />
      <Text style={styles.caption}>Carregando…</Text>
    </View>
  );
}

export default SplashScreen; // <-- default export

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 320,      // era 160 → dobramos
    height: 320,     // era 160 → dobramos
    resizeMode: "contain",
    marginBottom: 16,
  },
  title: { fontSize: 20, fontWeight: "800", letterSpacing: 0.3 },
  spinner: { marginTop: 12 },
  caption: { marginTop: 8, color: "#666" },
});

