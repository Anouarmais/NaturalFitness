import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const mainColor = "#FFD700"; // amarillo principal

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Container>
      {/* 🔹 Imagen superior centrada */}
      <ImageContainer>
        <HeaderImage
          source={require("../assets/images/naturalLogo1.png")}
          resizeMode="contain"
        />
      </ImageContainer>

      {/* 🔹 Texto principal */}
      <Content>
        <Title>¡Bienvenido!</Title>
        <Subtitle>Descubre tus nuevos retos</Subtitle>

        <StartButton
          onPress={() => {
            console.log("Ir a pantalla principal");
            router.push("/"); 
          }}
        >
          <ButtonText>Entrar</ButtonText>
        </StartButton>
      </Content>
    </Container>
  );
}

// 🔹 ESTILOS
const Container = styled.View`
  flex: 1;
  background-color: #111;
  align-items: center;
  justify-content: flex-end;
  padding: 40px 20px;
`;

const ImageContainer = styled.View`
  position: absolute;
  top: 5%; /* un poco más abajo para centrar */
  left: 0;
  right: 0;
  width: 120%;
  height: 75%; /* imagen más alta */
  overflow: hidden;
  align-items: center;
  justify-content: center; /* centrado vertical */
`;

const HeaderImage = styled.Image`
  width: 70%; /* logo más pequeño */
  height: 50%; /* logo más pequeño */
`;

const Content = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-bottom: 40px; /* apartado del texto más bajo */
`;

const Title = styled.Text`
  color: ${mainColor};
  font-size: 36px;
  font-family: "Poppins_700Bold";
`;

const Subtitle = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-top: 5px;
  font-family: "Poppins_500Medium";
`;

const StartButton = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${mainColor};
  padding: 14px;
  border-radius: 12px;
  margin-top: 40px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 6;
`;

const ButtonText = styled.Text`
  color: #000;
  font-size: 16px;
  font-family: "Poppins_700Bold";
  text-transform: uppercase;
`;
