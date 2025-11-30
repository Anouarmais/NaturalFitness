import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image } from "react-native";

import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from "react-native";
import styled from "styled-components/native";

const { width, height: windowHeight } = Dimensions.get("window");
const mainColor = "#FFD700";

// Styled Components
const Container = styled.ScrollView`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
`;

const Header = styled.View`
  width: 100%;
  margin-top: 35px;
  margin-bottom: 20px;
  align-items: flex-start;
`;

const AppTitle = styled.Text`
  font-size: 22px;
  font-family: "Poppins_700Bold";
  color: #222;
  letter-spacing: 0.5px;
  text-align: left;
  margin-bottom: 5px;
`;

const Underline = styled.View`
  width: 60px;
  height: 3px;
  background-color: ${mainColor};
  border-radius: 2px;
`;

const Card = styled.TouchableOpacity`
  width: ${width - 40}px;
  height: 190px;
  border-radius: 18px;
  overflow: hidden;
  margin-bottom: 22px;
  background-color: #000;
  elevation: 4;
`;

const Overlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
`;

const InfoContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 8px 15px;
  background-color: rgba(0, 0, 0, 0.55);
  border-top-width: 2px;
  border-top-color: ${mainColor};
`;

const Title = styled.Text`
  color: ${mainColor};
  font-size: 17px;
  font-family: "Poppins_700Bold";
`;

const Subtitle = styled.Text`
  color: #eee;
  font-size: 10px;
  margin-top: 4px;
  font-family: "Poppins_400Regular";
`;

// Componente Principal
export default function Premium() {
  const router = useRouter();
  const [showHint, setShowHint] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Animación de la flecha
  const arrowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnim, {
          toValue: -10,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
  }, []);

  const cards = [
    {
      id: "reto10",
      title: "Reto de 10 Días",
      subtitle: "Transforma tu cuerpo y tus hábitos.",
      image:
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "maderoterapia",
      title: "Maderoterapia",
      subtitle: "Moldea tu figura y activa la circulación.",
      image: require("../assets/images/maderoteriapia.png"),
    },
    {
      id: "cursoNut",
      title: "Curso de Nutrición",
      subtitle: "Cambiar tus hábitos alimenticios, cambia tu vida.",
      image: "https://i.ytimg.com/vi/uFeqNVfU4Q4/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAeeuk4Y8nlQjh8wkGL1bRgzIiGCg",
    },
    {
      id: "reto21",
      title: "Reto de 21 Días",
      subtitle: "La experiencia completa de transformación.",
       image: require("../assets/images/wedo.png"),
    },
  ];

  useEffect(() => {
    if (contentHeight > windowHeight) {
      setShowHint(true);
    }
  }, [contentHeight]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Container
        contentContainerStyle={{ alignItems: "center", paddingBottom: 50 }}
        onContentSizeChange={(w: number, h: number) => setContentHeight(h)}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          const layoutHeight = e.nativeEvent.layoutMeasurement.height;
          setShowHint(offsetY + layoutHeight < contentHeight - 10);
        }}
        scrollEventThrottle={16}
      >
        <Header>
          <AppTitle>Planes Premium</AppTitle>
          <Underline />
        </Header>
{cards.map((item) => (
  <Card
    key={item.id}
    onPress={() => router.push(`/premium/${item.id}` as any)}
  >
    {item.id === "reto21" ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={item.image} // imagen local
          style={{ width: 300, height: 300, resizeMode: "contain" }} // tamaño más pequeño
        />
        <InfoContainer>
          <Title>{item.title}</Title>
          <Subtitle>{item.subtitle}</Subtitle>
        </InfoContainer>
      </View>
    ) : (
      <ImageBackground
        source={typeof item.image === "string" ? { uri: item.image } : item.image}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <Overlay />
        <InfoContainer>
          <Title>{item.title}</Title>
          <Subtitle>{item.subtitle}</Subtitle>
        </InfoContainer>
      </ImageBackground>
    )}
  </Card>
))}

      </Container>

      {showHint && (
        <Animated.View
          style={{
            position: "absolute",
            bottom:20,
            right: 20,
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: mainColor,
            justifyContent: "center",
            alignItems: "center",
            transform: [{ translateY: arrowAnim }],
            zIndex: 999,
          }}
        >
          <Ionicons name="arrow-down-outline" size={24} color="#fff" />
        </Animated.View>
      )}
    </View>
  );
}
