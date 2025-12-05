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
    sku: "236K",
    nombre: "Phyto Complete",
    descripcion: ["Nutrición Interna", "Control de Peso", "Vegetarianos", "Veganos", "Sin Gluten", "Sin Lactosa"],
    precio: 43.71,
    vp: 38.15,
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2022/06-Jun/236K_SP_PhytoComplete_Square_1300px.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg"
  },
  {
    sku: "165K",
    nombre: "Bebida instantánea de extracto de té con plantas aromáticas - Original 51 g",
    descripcion: "Disponible en distintos sabores. Al pulsar el botón de WhatsApp te dirán los sabores.",
    categorias: ["Nutrición Interna", "Control de Peso", "Vegetarianos", "Veganos", "Sin Gluten", "Sin Lactosa", "Sin Soja", "Sin Fructosa"],
    precio: 21.66,
    vp: 19.95,
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2023/01-Jan/165K_SP_PO_Tea_Original_51g_Square_1300px.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg"
  },
  {
    sku: "048K",
    nombre: "Batido Fórmula 1 780 g",
    descripcion: "Disponible en distintos sabores. Al pulsar el botón de WhatsApp te dirán los sabores.",
    categorias: ["Nutrición Interna", "Esenciales", "Vegetarianos", "Veganos", "Sin Gluten", "Sin Lactosa", "Certificado Halal"],
    precio: 40.28,
    vp: 32.75,
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/048_SP_VanillaCream_Square_780g_1300.png/jcr:content/renditions/cq5dam.web.200.200.png"
  },
  {
    sku: "0006",
    nombre: "Concentrado Herbal Aloe mango 473 mL",
    descripcion: ["Nutrición Interna", "Control de Peso", "Vegetarianos", "Veganos", "Sin Gluten", "Sin Lactosa", "Sin Soja", "Sin Fructosa", "Certificado Halal"],
    precio: 27.81,
    vp: 24.95,
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/0006_SP_HerbalAloe_Original_High_1300px.png/jcr:content/renditions/cq5dam.web.200.200.png"
  },
  {
    sku: "2554",
    nombre: "Bebida con Avena, manzana y fibra (no incluye cuchara medidora) Manzana 204 g",
    descripcion: ["Nutrición Interna", "Nutrición Objetiva", "Vegetarianos", "Veganos", "Sin Lactosa", "Sin Fructosa"],
    precio: 19.61,
    vp: 22.95,
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/2554_OAFD_1300x1300px.png/jcr:content/renditions/cq5dam.web.200.200.png"
  },
  {
    sku: "3976",
    nombre: "Barritas con proteínas  Caja 14 barritas",
    descripcion: ["Nutrición Interna", "Control de Peso"],
    precio: 19.33,
    vp: 13.22,
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/3976_SP_Protein%20Bar_Citrus_BOX_High_1300px.png/jcr:content/renditions/cq5dam.web.200.200.png"
  },
  {
    sku: "141K",
    nombre: "Protein Chips  10 x 30 g",
    descripcion: "Disponible en sabores Sour cream y Cebolla",
    categorias: ["Nutrición Interna", "Control de Peso", "Vegetarianos", "Sin Gluten", "Sin Fructosa"],
    precio: 15.89,
    vp: 11.75,
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/06-Jun/141K_SP_PO_ProteinChips_BBQ_Box+Foil_1300px.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg"
  }, {
    nombre: "Batido Fórmula 1 - Plátano 550 g",
    descripcion: "Esenciales, Nutrición Interna, Vegetarianos, Veganos, No contienen Gluten, No contienen Lactosa, Certificado Halal",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/4462_SP_BananaCream_Square.png/jcr:content/renditions/cq5dam.web.200.200.png",
    precio: "32.02",
    sku: "4462"
  },
  {
    nombre: "Fórmula 3 Polvo de Proteínas Personalizado 240 g",
    descripcion: "Nutrición Interna, Control de Peso, No contienen Gluten, No contienen Fructosa, Certificado Halal",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/11-nov/0242_PPP_SP.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg",
    precio: "26.05",
    sku: "0242"
  },
  {
    nombre: "Bebida con Proteínas en Polvo Vainilla 588 g",
    descripcion: "Nutrición Interna, Control de Peso, Vegetarianos, No contienen Gluten, No contienen Fructosa, Certificado Halal",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/2600_PDM_1300x1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    precio: "37.26",
    sku: "2600"
  },
  {
    nombre: "Barritas F1 Express Chocolate Negro Paquete 7 unidades",
    descripcion: "Esenciales, Nutrición Interna, Vegetarianos",
    imagen: "https://assets.herbalifenutrition.com/content/dam/regional/emea/pt_pt/consumable_content/product-catalog-assets/images/2022/01-Jan/4472_SP_PO_F1ExpressBar_Box_DarkChoc_High_1300px.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg",
    precio: "16.2",
    sku: "4472"
  }
];


export default function perderPeso() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const orderNow = (product: any) => {
    const phoneNumber = "34610101096";
    const message = encodeURIComponent(
      `Hola, quiero pedir ${product.title} `
    );
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${message}`);
  };

  return (
    <Container style={{ paddingTop: insets.top + 10 }}>
      <Header>
        <BackButton onPress={() => router.push("/herbalife")}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </BackButton>
        <TitleText>Perder Peso</TitleText>
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
