import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useCallback } from "react";
import { Linking, Text, View } from "react-native";
import styled from "styled-components/native";

const mainColor = "#FFD700";

// 🔹 Contenedor general
const Container = styled.ScrollView`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
`;

const Header = styled.View`
  width: 100%;
  margin-top: 35px;
  margin-bottom: 25px;
`;

const HeaderTop = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleHeader = styled.Text`
  font-size: 22px;
  font-family: "Poppins_700Bold";
  color: #222;
  margin-left: 10px;
`;

const Underline = styled.View`
  width: 60px;
  height: 3px;
  background-color: ${mainColor};
  border-radius: 2px;
  margin-top: 6px;
  margin-left: 36px;
`;

const Highlight = styled.Text`
  color: ${mainColor};
  font-weight: bold;
`;

const FloatingButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 10;
`;

const WhatsAppButton = styled.TouchableOpacity`
  background-color: #25d366;
  padding: 14px 20px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export default function TrabajaconNosotros() {
  const router = useRouter();

  // 🔹 Player
  const player = useVideoPlayer(require("../assets/images/trabajacon nosotros.mp4"));

  const openWhatsApp = () => {
    const phoneNumber = "34610101096";
    const message = encodeURIComponent(
      "¡Hola! Quiero más información sobre Trabajar con Paco Montes 💪"
    );
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${message}`);
  };

  // 🔹 Play / Pause protegido
// 🔹 Play / Pause protegido
useFocusEffect(
  useCallback(() => {
    if (player && typeof player.play === "function") {
      try {
        player.play();
      } catch (error) {
        console.log("⚠ Error al reproducir video:", error);
      }
    }

    return () => {
      if (player && typeof player.pause === "function") {
        try {
          player.pause();
        } catch (error) {
          console.log("⚠ Error al pausar video:", error);
        }
      }
    };
  }, [player])
);


  return (
    <View style={{ flex: 1 }}>
      <Container contentContainerStyle={{ paddingBottom: 120 }}>
        <Header>
          <HeaderTop>
            <TitleHeader>Trabaja con Paco Montes</TitleHeader>
          </HeaderTop>
          <Underline />
        </Header>

        {/* Video */}
        <View
          style={{
            width: "100%",
            height: 220,
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <VideoView
            player={player}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            nativeControls
            muted={false}
            audioMode={{
              allowsRecordingIOS: false,
              staysActiveInBackground: false,
              playsInSilentModeIOS: true,
            }}
          />
        </View>

        {/* Texto explicativo */}
        <Text
          style={{
            fontSize: 16,
            lineHeight: 26,
            textAlign: "justify",
            color: "#333",
          }}
        >
          💰 Con Paco Montes puedes aprender a generar{" "}
          <Highlight>ingresos extra</Highlight> vendiendo productos de nutrición y suplementos.
          {"\n\n"}Aprenderás a vender de manera profesional, formar tu propio
          equipo y recibir comisiones por sus ventas.
          {"\n\n"}Es un método flexible donde tus ganancias dependen de tus ventas
          y esfuerzo. Con la guía de Paco, podrás iniciar tu negocio de forma
          independiente y desde cualquier lugar.
        </Text>
      </Container>

      {/* Botón flotante */}
      <FloatingButtonContainer>
        <WhatsAppButton onPress={openWhatsApp}>
          <ButtonText>Escríbele a Paco por WhatsApp 💬</ButtonText>
        </WhatsAppButton>
      </FloatingButtonContainer>
    </View>
  );
}
