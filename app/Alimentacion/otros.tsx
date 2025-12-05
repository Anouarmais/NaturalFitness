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

const Card = styled.View`
  flex-direction: row;
  background-color: #fff;
  border-radius: 18px;
  padding: 20px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #000; /* borde negro */
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
const products = [
  {
    "nombre": "Immune Booster Frutos silvestres",
    "sku": "233K",
    "descripcion": "Nutrición Interna, Nutrición Objetiva",
    "imagen": "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2022/06-Jun/233K_SP_PO_ImmuneBooster_Square_1300px.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg",
    "precio": 26.09,
    "vp": 18.9
  },
  {
    "nombre": "Night Mode Manzanilla y Melocotón 180 g",
    "sku": "282K",
    "descripcion": "Nutrición Interna, Nutrición Objetiva",
    "imagen": "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2023/09-Sep/282k-sp-po-night-mode-square-800px.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg",
    "precio": 32.77,
    "vp": 31.25
  },
  {
    "nombre": "Microbiotic Max - 20 sobres Vainilla",
    "sku": "173K",
    "descripcion": "Nutrición Interna, Nutrición Objetiva, No contienen Gluten, No contienen Fructosa",
    "imagen": "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/Micro_1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    "precio": 32.55,
    "vp": 27.1
  },
  {
    "nombre": "Beta heart® (No incluye cuchara, utilizar la Ref. 1B42) Vainilla 229 g",
    "sku": "0267",
    "descripcion": "Nutrición Interna, Nutrición Objetiva, Vegetarianos, No contienen Soja, No contienen Fructosa, Certificado Halal",
    "imagen": "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/0267_BH_1300x1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    "precio": 28.85,
    "vp": 25.95
  }
];


export default function otros() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const orderNow = (product: any) => {
    const phoneNumber = "34610101096";
    const message = encodeURIComponent(
      `Hola, quiero pedir ${product.title})`
    );
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${message}`);
  };

  return (
    <Container style={{ paddingTop: insets.top + 10 }}>
      <Header>
        <BackButton onPress={() => router.push("/herbalife")}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </BackButton>
        <TitleText>Otros</TitleText>
      </Header>

      {products.map((product, idx) => (
        <Card key={idx}>
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
