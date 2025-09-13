import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";

type RootScreen = "splash" | "home";

export default function App() {
  const [screen, setScreen] = useState<RootScreen>("splash");

  useEffect(() => {
    const t = setTimeout(() => setScreen("home"), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar barStyle="dark-content" />
        {screen === "splash" ? <SplashScreen /> : <HomeScreen />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
