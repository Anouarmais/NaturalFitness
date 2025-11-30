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
    nombre: "Sérum Minimizador de Líneas 50 ml",
    sku: "0829",
    descripcion: "Nutrición Externa, Herbalife SKIN",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/0829_SP_SKINLineMinimisingSerum_50ML_1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    precio: 43.68,
    vp: 43.35
  },
  {
    nombre: "Collagen Skin Booster - No se incluye cuchara (usar referencia 2B08) Fresa y limón 171 g",
    sku: "076K",
    descripcion: "Nutrición Externa, Herbalife SKIN",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/076K_SP.png/jcr:content/renditions/cq5dam.web.200.200.png",
    precio: 43.08,
    vp: 37.1
  },
  {
    nombre: "Crema Tensora Ultimate de HL/Skin 50 ml",
    sku: "513K",
    descripcion: "Nutrición Externa",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2025/09-sep/513k-hl-skin-ultimate-tension-cream-image-es.png/jcr:content/renditions/cq5dam.web.200.200.png",
    precio: 34.98,
    vp: 35.2
  },
  {
    nombre: "Crema Hidratante de Día 50 ml",
    sku: "0830",
    descripcion: "Nutrición Externa, Herbalife SKIN",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/0830_SP_SKINDailyGlowMoisturiser_50ML_1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    precio: 32.89,
    vp: 32.65
  },
  {
    nombre: "Sérum con 10 % de Niacinamida de HL/Skin 30 ml",
    sku: "508K",
    descripcion: "Nutrición Externa",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2025/09-sep/508k-hl-skin-niacinamide-serum-image-es.png/jcr:content/renditions/cq5dam.web.200.200.png",
    precio: 31.48,
    vp: 31.7
  },
  {
    nombre: "Gel de Ojos Reafirmante 15 ml",
    sku: "0770",
    descripcion: "Nutrición Externa, Herbalife SKIN",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/0770_SP_SKINFirmingEyeGel_1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    precio: 26.53,
    vp: 26.35
  },
  {
    nombre: "Gel Limpiador Suavizante con Aloe 150 ml",
    sku: "0765",
    descripcion: "Nutrición Externa, Herbalife SKIN",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/0765_SP_SKINSoothingAloeCleanser_1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    precio: 16.88,
    vp: 16.75
  },
  {
    nombre: "Champú Fortalecedor 250 ml",
    sku: "2564",
    descripcion: "Nutrición Externa, Nueva Línea Herbal Aloe",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/2564_SP_AloeStrengtheningShampoo_High_1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    precio: 9.75,
    vp: 8.3
  },
  {
    nombre: "Coctelera de Neón - Verde Oscuro - 600 ml",
    sku: "2N52",
    descripcion: "Medir, Mezclar & Servir, Promote",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2025/04-Apr/2N52.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg",
    precio: 11.4,
    vp: 1.45
  }
];


export default function otros() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const orderNow = (product: any) => {
    const phoneNumber = "34610101096";
    const message = encodeURIComponent(
      `Hola, quiero pedir ${product.title} (${product.price} €)`
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
