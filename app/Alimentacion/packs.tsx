import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

const mainColor = "#FFD700";

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

const TitleText = styled.Text`
  font-family: "Poppins_700Bold";
  font-size: 22px;
  color: #222;
`;

const SectionTitle = styled.Text`
  font-family: "Poppins_700Bold";
  font-size: 18px;
  color: #000;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const Card = styled.View`
  background-color: #fff;
  border-radius: 18px;
  margin-bottom: 24px;
  overflow: hidden;
  border: 2px solid #000;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 180px;
`;

const Info = styled.View`
  padding: 15px;
`;

const ProductTitle = styled.Text`
  font-family: "Poppins_700Bold";
  font-size: 16px;
  color: #000;
`;

const ProductDescription = styled.Text`
  font-family: "Poppins_400Regular";
  font-size: 12px;
  color: #555;
  margin-top: 4px;
`;

const WhatsAppButton = styled.TouchableOpacity`
  background-color: ${mainColor};
  padding: 10px 14px;
  border-radius: 10px;
  align-items: center;
  margin-top: 10px;
`;

const WhatsAppText = styled.Text`
  font-family: "Poppins_700Bold";
  color: #000;
  font-size: 14px;
`;

// Productos con imágenes locales y externas
const products = {
  perderPeso: [
    {
      nombre: "Desayuno Saludable Herbalife",
      descripcion: "Nutrición interna, control de peso, vegano.",
      imagen:
        "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/052Z_Crema_Vainilla_780_Paquete_Desayuno.png/jcr:content/renditions/cq5dam.web.200.200.png",
    },
    {
      nombre: "Bebida Reductora",
      descripcion: "Control de peso y nutrición balanceada.",
      imagen:
        "https://pub-7d51dc54c0094d719feb2425f890a22c.r2.dev/Alimentacion/chupapanza.jpg",
    },
  ],
  ganarMusculo: [
    {
      nombre: "Pack Básico Herbalife",
      descripcion: "Proteína Rebuild + Creatina",
      imagen: require("../../assets/images/packBasico1.png"),
    },
    {
      nombre: "Pack Avanzado Herbalife",
      descripcion: "Creatina + Proteína Rebuild + Proteína F1",
      imagen: require("../../assets/images/packAvanzado1.png"),
    },
  ],
};

export default function Packs() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const orderNow = (product: any) => {
    const phoneNumber = "34610101096";
    const message = encodeURIComponent(`Hola, quiero pedir ${product.nombre}`);
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${message}`);
  };

  const renderImage = (img: any) =>
    typeof img === "string" ? { uri: img } : img;

  return (
    <Container style={{ paddingTop: insets.top + 10 }}>
      <Header>
        <BackButton onPress={() => router.push("/herbalife")}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </BackButton>
        <TitleText>Packs</TitleText>
      </Header>

      <SectionTitle>Perder Peso</SectionTitle>
      {products.perderPeso.map((product, idx) => (
        <Card key={`perder-${idx}`}>
          <ProductImage source={renderImage(product.imagen)} resizeMode="contain" />
          <Info>
            <ProductTitle>{product.nombre}</ProductTitle>
            <ProductDescription>{product.descripcion}</ProductDescription>
            <WhatsAppButton onPress={() => orderNow(product)}>
              <WhatsAppText>Ordénalo por WhatsApp</WhatsAppText>
            </WhatsAppButton>
          </Info>
        </Card>
      ))}

      <SectionTitle>Ganar Músculo</SectionTitle>
      {products.ganarMusculo.map((product, idx) => (
        <Card key={`musculo-${idx}`}>
          <ProductImage source={renderImage(product.imagen)} resizeMode="contain" />
          <Info>
            <ProductTitle>{product.nombre}</ProductTitle>
            <ProductDescription>{product.descripcion}</ProductDescription>
            <WhatsAppButton onPress={() => orderNow(product)}>
              <WhatsAppText>Ordénalo por WhatsApp</WhatsAppText>
            </WhatsAppButton>
          </Info>
        </Card>
      ))}
    </Container>
  );
}
