import { Poppins_400Regular, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { Stack, usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Navbar from "../components/Navbar";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (fontsLoaded && pathname === "/") {
      router.replace("/welcome");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111", // mismo fondo que el welcome
        }}
      >
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  // 🔹 Render principal
  // Si estamos en welcome, renderizamos solo el Stack sin Navbar
  if (pathname === "/welcome") {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#111" }, // fondo negro igual al welcome
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff", paddingBottom: 70 },
        }}
      />
      <Navbar />
    </View>
  );
}
