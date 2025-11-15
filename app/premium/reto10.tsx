import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import styled from "styled-components/native";


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

export default function Reto10Dias() {
    const router = useRouter();
  const openWhatsApp = () => {
    const phoneNumber = "34610101096"; 
    const message = encodeURIComponent("¡Hola! Quiero empezar el Reto de 10 Días 💪");
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
    <TitleHeader>Ejercicio</TitleHeader>
  </HeaderTop>
  <Underline />
</Header>

<Underline />


        <Image
          source={require("../../assets/images/reto10dias.png")}
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
          ¿Quieres dar el primer paso hacia una versión más fuerte y saludable
          de ti? 🌟{"\n\n"}
          El <Highlight>Reto de 10 Días</Highlight> es perfecto para comenzar y
          ver resultados rápidos. En tan solo 10 días recibirás:
          {"\n\n"}✅ <Highlight>Asesoramiento personalizado</Highlight> para
          adaptar el plan a tus necesidades.{"\n"}
          ✅ <Highlight>Plan de alimentación guiado</Highlight> con recetas
          fáciles y nutritivas.{"\n"}
          ✅ <Highlight>Entrenamientos diarios</Highlight> diseñados para activar
          tu cuerpo y tu energía.{"\n"}
          ✅ <Highlight>Apoyo y seguimiento</Highlight> constante para
          mantenerte motivado.{"\n"}
          ✅ Acceso a un grupo privado donde compartir avances y resolver dudas.
          {"\n\n"}🔥{" "}
          <Highlight>Resultados visibles en poco tiempo:</Highlight> mejora tu
          energía, tonifica tu cuerpo y empieza a crear hábitos saludables que
          marcarán la diferencia.{"\n\n"}
          No esperes más: <Highlight>tu cambio empieza ahora</Highlight>. 
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
