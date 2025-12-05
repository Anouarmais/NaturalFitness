import { useFocusEffect } from "@react-navigation/native";
import { Video } from "expo-av";
import { useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const mainColor = "#FFD700";

// 🔹 Contenedor general
const Container = styled.ScrollView`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
`;

// 🔹 Encabezado con título
const Header = styled.View`
  width: 100%;
  margin-top: 35px;
  margin-bottom: 25px; /* espacio debajo de la ralla */
`;

const HeaderTop = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleHeader = styled.Text`
  font-size: 22px;
  font-family: "Poppins_700Bold";
  color: #222;
  margin-left: 10px; /* espacio entre flecha y título */
`;

const Underline = styled.View`
  width: 60px;
  height: 3px;
  background-color: ${mainColor};
  border-radius: 2px;
  margin-top: 6px;
  margin-left: 36px; /* alineación con el texto */
`;

const Highlight = styled.Text`
  color: ${mainColor};
  font-weight: bold;
`;

// 🔹 Botón fijo de WhatsApp
const FloatingButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 10;
`;

const WhatsAppButton = styled(TouchableOpacity)`
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
  const videoRef = useRef<Video>(null);

  const openWhatsApp = () => {
    const phoneNumber = "34610101096";
    const message = encodeURIComponent("¡Hola! Quiero más información sobre Trabajar con Paco Montes 💪");
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${message}`);
  };

  // Reproduce el video automáticamente solo la primera vez
  useFocusEffect(
    useCallback(() => {
      if (videoRef.current) {
        videoRef.current.playAsync();
      }
      return () => {
        if (videoRef.current) {
          videoRef.current.pauseAsync();
        }
      };
    }, [])
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

        {/* Video explicativo */}
        <View
          style={{
            width: "100%",
            height: 220,
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <Video
            ref={videoRef}
            source={require("../assets/images/trabajacon nosotros.mp4")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            useNativeControls={true}
            isLooping={false}
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
          💰 Con Paco Montes puedes aprender a generar <Highlight>ingresos extra</Highlight> vendiendo productos de nutrición y suplementos.
          {"\n\n"}Aprenderás a vender de manera profesional, formar tu propio equipo y recibir comisiones por sus ventas. 
          {"\n\n"}Es un método flexible donde tus ganancias dependen de tus ventas y esfuerzo. Con la guía de Paco, podrás iniciar tu negocio de forma independiente y desde cualquier lugar.
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
