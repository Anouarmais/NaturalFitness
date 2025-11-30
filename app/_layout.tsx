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
          backgroundColor: "#111",
        }}
      >
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  // 🔹 Si estamos en welcome, NO mostrar la navbar
  if (pathname === "/welcome") {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#111" },
        }}
      />
    );
  }

  // 🔹 Layout normal con navbar abajo
  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      
      {/* CONTENIDO DE LAS SCREENS */}
      <View style={{ flex: 1, paddingBottom: 70 }}>
        {/* paddingBottom igual a la altura del navbar (ajusta si hace falta) */}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#111" },
          }}
        />
      </View>

      {/* NAVBAR FIJA ABAJO */}
      <Navbar />
    </View>
  );
}
