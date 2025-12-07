import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useCallback } from "react";
import { Dimensions, Linking, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");
const mainColor = "#FFD700";

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

export default function Reto21Dias() {
  const router = useRouter();

  const player1 = useVideoPlayer(require("../../assets/images/wedopaco.mp4"));
  const player2 = useVideoPlayer(require("../../assets/images/wedoantes.mp4"));

  useFocusEffect(
    useCallback(() => {
      // 🔥 reproducir al entrar
      player1?.play?.();
      player2?.play?.();

      return () => {
        // 🔥 Pausar y liberar al salir, evitando errores si ya se liberó
        try {
          player1?.pause?.();
          player1?.release?.();
        } catch (e) {
          console.log("Error liberando player1:", e);
        }

        try {
          player2?.pause?.();
          player2?.release?.();
        } catch (e) {
          console.log("Error liberando player2:", e);
        }
      };
    }, [player1, player2])
  );

  const openWhatsApp = () => {
    const phoneNumber = "34610101096";
    const message = encodeURIComponent("¡Hola! Quiero empezar el Reto de 21 Días 💪");
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${message}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <Container contentContainerStyle={{ paddingBottom: 120 }}>
        <Header>
          <HeaderTop>
            <TouchableOpacity onPress={() => router.push("/premium" as any)}>
              <Ionicons name="arrow-back" size={26} color="#000" />
            </TouchableOpacity>
            <TitleHeader>Reto 21 Días</TitleHeader>
          </HeaderTop>
          <Underline />
        </Header>

        <View style={{ width: "100%", height: 220, borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
          <VideoView
            player={player1}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            fullscreenOptions={{ enabled: true }}
          />
        </View>

        <Text style={{ fontSize: 16, lineHeight: 26, textAlign: "justify", color: "#333" }}>
          ¿Estás listo para tu cambio? 🚀{"\n\n"}
          El <Highlight>Reto de 21 Días</Highlight> es la experiencia completa de transformación...
        </Text>

        <View style={{ width: "100%", height: 400, borderRadius: 12, overflow: "hidden", marginVertical: 20 }}>
          <VideoView
            player={player2}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
            fullscreenOptions={{ enabled: true }}
          />
        </View>

        <Text style={{ fontSize: 16, lineHeight: 26, textAlign: "justify", color: "#333" }}>
          (resto del texto igual)...
        </Text>
      </Container>

      <FloatingButtonContainer>
        <WhatsAppButton onPress={openWhatsApp}>
          <ButtonText>Empieza hoy mismo por WhatsApp 💬</ButtonText>
        </WhatsAppButton>
      </FloatingButtonContainer>
    </View>
  );
}
