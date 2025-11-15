import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");
const mainColor = "#FFD700"; // 🟡 Color principal

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
  margin-top: 6px; /* espacio entre título y línea */
  margin-left: 36px; /* alineación con el texto después de la flecha */
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

export default function Reto21Dias() {
  const openWhatsApp = () => {
    const phoneNumber = "34610101096"; 
    const message = encodeURIComponent("¡Hola! Quiero empezar el Reto de 21 Días 💪");
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${message}`);
  };
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <Container contentContainerStyle={{ paddingBottom: 120 }}>
<Header>
  <HeaderTop>
    <TouchableOpacity onPress={() => router.push("/premium" as any)}>
      <Ionicons name="arrow-back" size={26} color="#000" />
    </TouchableOpacity>
    <TitleHeader>Ejercicio</TitleHeader>
  </HeaderTop>
  <Underline />
</Header>


        <Image
          source={require("../../assets/images/21dias.png")}
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
          }}
        >
          ¿Estás listo para tu cambio? 🚀{"\n\n"}
          El <Highlight>Reto de 21 Días</Highlight> es la experiencia completa de transformación 
          que necesitas para lograr resultados sostenibles y transformadores. 
          En estos 21 días recibirás:
          {"\n\n"}✅ <Highlight>Asesoramiento personalizado</Highlight> para un plan adaptado a ti.{"\n"}
          ✅ <Highlight>Plan de alimentación adaptado</Highlight> a tus necesidades.{"\n"}
          ✅ <Highlight>Suplementación incluida</Highlight> para optimizar tus resultados.{"\n"}
          ✅ <Highlight>Entrenamiento guiado paso a paso</Highlight> para asegurar tu progreso.{"\n"}
          ✅ <Highlight>Acceso a App exclusiva</Highlight> con todo lo que necesitas.{"\n"}
          ✅ <Highlight>Grupo privado - comunidad internacional</Highlight> de apoyo.{"\n"}
          ✅ <Highlight>Recetas fáciles y rápidas</Highlight> para simplificar tu día a día.{"\n"}
          ✅ <Highlight>Seguimiento diario y semanal</Highlight> (peso, fotos, medidas).{"\n"}
          ✅ <Highlight>Reto de hábitos completos</Highlight> (alimentación, descanso, hidratación).{"\n"}
          ✅ <Highlight>Sesión en vivo de formación</Highlight> para resolver todas tus dudas.{"\n"}
          ✅ <Highlight>Premio de $500 al ganador</Highlight> del reto.{"\n\n"}
          🌟 <Highlight>Resultados sostenibles y transformadores:</Highlight>{"\n"}
          No solo cambiarás tu cuerpo, transformarás tu estilo de vida por completo. 
          Crearás hábitos sólidos, ganarás confianza y verás cambios reales que perduran.{"\n\n"}
          <Highlight>¿Estás listo para tu cambio?</Highlight>{"\n"}
          Escribeme y empieza hoy tu transformación. 
        </Text>
      </Container>

      {/* Botón flotante */}
      <FloatingButtonContainer>
        <WhatsAppButton onPress={openWhatsApp}>
          <ButtonText>Empieza hoy mismo por WhatsApp 💬</ButtonText>
        </WhatsAppButton>
      </FloatingButtonContainer>
    </View>
  );
}