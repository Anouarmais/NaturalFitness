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
  flex-direction: row;
  background-color: #fff;
  border-radius: 18px;
  padding: 20px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #000;
`;

const Info = styled.View`
  flex: 1;
  margin-right: 10px;
`;

const ProductTitle = styled.Text`
  font-family: "Poppins_700Bold";
  font-size: 14px;
  color: #000;
`;

const ProductDescription = styled.Text`
  font-family: "Poppins_400Regular";
  font-size: 11px;
  color: #555;
  margin-top: 3px;
`;

const ProductImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 12px;
`;

const WhatsAppButton = styled.TouchableOpacity`
  background-color: ${mainColor};
  padding: 8px 12px;
  border-radius: 10px;
  align-items: center;
  margin-top: 10px;
`;

const WhatsAppText = styled.Text`
  font-family: "Poppins_700Bold";
  color: #000;
  font-size: 14px;
`;

const products = {
  perderPeso: [
    {
      nombre: "Desayuno Saludable Herbalife Nutrition - Crema de Vainilla 780 g",
      descripcion: "SKU 052Z | Nutrición Interna, Control de Peso, Vegetarianos, Veganos, No contienen Gluten, No contienen Lactosa, Certificado Halal",
      imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/052Z_Crema_Vainilla_780_Paquete_Desayuno.png/jcr:content/renditions/cq5dam.web.200.200.png",
      price: 89.74
    },
    {
      nombre: "Desayuno Saludable Herbalife Nutrition - Frambuesa y Chocolate Blanco 500 g",
      descripcion: "SKU 598Z | Nutrición Interna, Control de Peso, Vegetarianos, Veganos, No contienen Gluten, No contienen Lactosa, Certificado Halal",
      imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/598Z_Framb_Choc_Paquete_Desayuno.png/_jcr_content/renditions/cq5dam.web.200.200.png",
      price: 81.48
    }
  ],
  ganarMusculo: [
{
  nombre: "Desayuno Saludable Herbalife Nutrition - Frambuesa y Chocolate Blanco 500 g",
  descripcion: "Proteína Rebuild + Creatina | Nutrición Interna, Control de Peso, Vegetarianos, Veganos, No contienen Gluten, No contienen Lactosa, Certificado Halal",
  imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/2590_Caffe_Latte_Paquete_Desayuno.png/_jcr_content/renditions/cq5dam.web.200.200.png",
  price: 81.48
},
{
  nombre: "Desayuno Saludable Herbalife Nutrition - Frambuesa y Chocolate Blanco 500 g",
  descripcion: "Creatina + Proteína Rebuild + Proteína F1 | Nutrición Interna, Control de Peso, Vegetarianos, Veganos, No contienen Gluten, No contienen Lactosa, Certificado Halal",
  imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/044Z_Menta_Chocolate_Paquete_Desayuno_.png/_jcr_content/renditions/cq5dam.web.200.200.png",
  price: 81.48
}

  ]
};

export default function Packs() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const orderNow = (product: any) => {
    const phoneNumber = "34610101096";
    const message = encodeURIComponent(
      `Hola, quiero pedir ${product.nombre} (${product.price} €)`
    );
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${message}`);
  };

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
          <Info>
            <ProductTitle>{product.nombre}</ProductTitle>
            <ProductDescription>{product.descripcion}</ProductDescription>
            <WhatsAppButton onPress={() => orderNow(product)}>
              <WhatsAppText>Ordénalo por WhatsApp</WhatsAppText>
            </WhatsAppButton>
          </Info>
          <ProductImage source={{ uri: product.imagen }} resizeMode="cover" />
        </Card>
      ))}

      <SectionTitle>Ganar Músculo</SectionTitle>
      {products.ganarMusculo.map((product, idx) => (
        <Card key={`musculo-${idx}`}>
          <Info>
            <ProductTitle>{product.nombre}</ProductTitle>
            <ProductDescription>{product.descripcion}</ProductDescription>
            <WhatsAppButton onPress={() => orderNow(product)}>
              <WhatsAppText>Ordénalo por WhatsApp</WhatsAppText>
            </WhatsAppButton>
          </Info>
          <ProductImage source={{ uri: product.imagen }} resizeMode="cover" />
        </Card>
      ))}
    </Container>
  );
}
