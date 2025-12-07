import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useCallback, useEffect } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
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

export default function Maderoterapia() {
  const router = useRouter();

  // Crear player
  const player = useVideoPlayer(require("../../assets/images/shortmadero.mp4"));

  // Loop manual
  useEffect(() => {
    const sub = player.addListener("ended", () => {
      try {
        player.seek(0);
        player.play();
      } catch (err) {
        console.log("⚠ Error al reiniciar el loop:", err);
      }
    });

    return () => {
      sub.remove();
    };
  }, [player]);

  // Play / pause cuando entras y sales
  useFocusEffect(
    useCallback(() => {
      try {
        player.play();
      } catch (error) {
        console.log("⚠ Error al reproducir:", error);
      }

      return () => {
        try {
          player.pause();
        } catch (error) {
          console.log("⚠ Error al pausar:", error);
        }
      };
    }, [player])
  );

  const openWhatsApp = () => {
    const phoneNumber = "34610101096";
    const message = encodeURIComponent(
      "¡Hola! Quiero empezar la Maderoterapia 💆‍♀️"
    );
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
            <TitleHeader>Maderoterapia</TitleHeader>
          </HeaderTop>
          <Underline />
        </Header>

        <Image
          source={require("../../assets/images/maderajessica.jpg")}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 12,
            marginBottom: 20,
          }}
          resizeMode="cover"
        />

        <Text
          style={{
            fontSize: 16,
            lineHeight: 26,
            textAlign: "justify",
            color: "#333",
            marginBottom: 20,
          }}
        >
          La <Highlight>Maderoterapia</Highlight> es una técnica innovadora para
          moldear y relajar tu cuerpo utilizando herramientas de madera
          especializadas. 🌿{"\n\n"}
          Con sesiones personalizadas recibirás:{"\n\n"}
          ✅ <Highlight>Reducción de celulitis</Highlight> y tonificación.{"\n"}
          ✅ <Highlight>Estimulación de la circulación</Highlight>.{"\n"}
          ✅ <Highlight>Relajación profunda</Highlight>.{"\n\n"}
        </Text>

        {/* Video en bucle */}
        <View
          style={{
            width: "100%",
            height: 400,
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <VideoView
            player={player}
            style={{ width: "100%", height: "100%" }}
            nativeControls={false}
            resizeMode="cover"
            muted={false}
            audioMode={{
              allowsRecordingIOS: false,
              staysActiveInBackground: false,
              playsInSilentModeIOS: true,
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 16,
            lineHeight: 26,
            textAlign: "justify",
            color: "#333",
            marginBottom: 20,
          }}
        >
          Cada sesión es completamente personalizada según tus objetivos.
          Relajarte, moldear tu figura o activar la circulación,
          la <Highlight>Maderoterapia</Highlight> es ideal para ti.
        </Text>
      </Container>

      <FloatingButtonContainer>
        <WhatsAppButton onPress={openWhatsApp}>
          <ButtonText>Contacta con Jessica 💬</ButtonText>
        </WhatsAppButton>
      </FloatingButtonContainer>
    </View>
  );
}
