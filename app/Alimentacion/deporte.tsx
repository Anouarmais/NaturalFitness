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
    title: "Rebuild Strength Chocolate 1000 g",
    description: "Nutrición Interna, Energía, Deporte y Forma Física, Vegetarianos, No contienen Gluten",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2024/09-Sep/403K_Rebuild_Strength.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg",
    price: "42.2",
    sku: "403K",
  },
  {
    title: "High Protein Iced Coffee Latte Macchiato 308 g",
    description: "Nutrición Interna, Control de Peso, Vegetarianos, No contienen Gluten, No contienen Soja, No contienen Fructosa",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/012K_HPIC_LM.png/jcr:content/renditions/cq5dam.web.200.200.png",
    price: "37.13",
    sku: "012K",
  },
  {
    title: "Restore 30 Cápsulas",
    description: "Nutrición Interna, Energía, Deporte y Forma Física, Vegetarianos, No contienen Gluten, No contienen Soja, No contienen Fructosa",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/1424_Restore.png/jcr:content/renditions/cq5dam.web.200.200.png",
    price: "21.46",
    sku: "1424",
  },
  {
    title: "Herbalifeline Max 30 Cápsulas",
    description: "Nutrición Interna, Nutrición Objetiva, No contienen Gluten, No contienen Lactosa, No contienen Soja, No contienen Fructosa",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/0043_HLline_1300x1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    price: "21.52",
    sku: "0043",
  },
  {
    title: "LiftOff Max de H24 - Sabor a Pomelo - 10 sobres por envase",
    description: "Nutrición Interna, Energía, Deporte y Forma Física, Vegetarianos, Veganos, No contienen Gluten, No contienen Lactosa, No contienen Soja, No contienen Fructosa",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2025/07-Jul/192k-liftoffmax-grapefruit-800x800-es.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg",
    price: "19.45",
    sku: "192K",
  },
  {
    title: "LiftOff - Sabor a Lima-Limón - 10 comprimidos efervescentes por envase",
    description: "Nutrición Interna, Energía, Deporte y Forma Física, Vegetarianos, Veganos, No contienen Gluten, No contienen Lactosa, No contienen Soja, No contienen Fructosa",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/3152_SP_LiftoffLemon_High_1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    price: "20.93",
    sku: "3152",
  },
  {
    title: "Rebuild Endurance Vainilla 1000 g",
    description: "Nutrición Interna, Energía, Deporte y Forma Física, Vegetarianos, No contienen Gluten",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/1436_Endurance.png/jcr:content/renditions/cq5dam.web.200.200.png",
    price: "46.53",
    sku: "1436",
  },
  {
    title: "Prolong Gel Energético - Fresa 10 sobres",
    description: "Nutrición Interna, Energía, Deporte y Forma Física",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2024/09-Sep/402K.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg",
    price: "15.84",
    sku: "402K",
  },
  {
    title: "CR7 Drive Frutos de acai 540 g",
    description: "Nutrición Interna, Energía, Deporte y Forma Física, Vegetarianos, Veganos, No contienen Gluten, No contienen Lactosa, No contienen Soja",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/1466_Canister.png/jcr:content/renditions/cq5dam.web.200.200.png",
    price: "14.78",
    sku: "1466",
  },
  {
    title: "Barritas de Proteínas Achieve H24 Galleta con trocitos de chocolate Caja de 6 barritas",
    description: "Nutrición Interna, Energía, Deporte y Forma Física, Vegetarianos, No contienen Fructosa",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/09-Sep/149KSP_H24_Bars_Cookie.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg",
    price: "15.58",
    sku: "149K",
  },
  {
    title: "Niteworks Limón 15 raciones",
    description: "Nutrición Interna, Nutrición Objetiva",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/3150_Nite_1300x1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    price: "57.15",
    sku: "3150"
  },
  {
    title: "Hydrate Naranja 20 u. x 5,3 gr",
    description: "Nutrición Interna, Energía, Deporte y Forma Física, Vegetarianos, Veganos, No contienen Gluten, No contienen Lactosa, No contienen Soja, No contienen Fructosa",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/1433_Hydrate.png/jcr:content/renditions/cq5dam.web.200.200.png",
    price: "22.39",
    sku: "1433"
  },
  {
    title: "Creatine+ Sin Sabor 228 g",
    description: "Nutrición Interna, Energía, Deporte y Forma Física",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2025/07-Jul/488K.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg",
    price: "19.46",
    sku: "488K"
  },
  {
    title: "Fórmula 2 Hombre - Complejo de Vitaminas y Minerales",
    description: "Esenciales, Nutrición Interna, No contienen Gluten, No contienen Lactosa, No contienen Soja, No contienen Fructosa, Certificado Halal",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/1800_SP_Formula2-MEN_High_A_1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    price: "15.6",
    sku: "1800"
  },
  {
    title: "Fórmula 2 Mujer - Complejo de Vitaminas y Minerales",
    description: "Esenciales, Nutrición Interna, No contienen Gluten, No contienen Lactosa, No contienen Soja, No contienen Fructosa, Certificado Halal",
    image: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/1819_SP_Formula2-WOMEN_High_A_1300px.png/jcr:content/renditions/cq5dam.web.200.200.png",
    price: "15.6",
    sku: "1819"
  }
];

export default function Deporte() {
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
        <TitleText>Deporte</TitleText>
      </Header>

      {products.map((product, idx) => (
        <Card key={idx}>
          <Info>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <WhatsAppButton onPress={() => orderNow(product)}>
              <WhatsAppText>Ordénalo por WhatsApp</WhatsAppText>
            </WhatsAppButton>
          </Info>
          <ProductImage source={{ uri: product.image }} resizeMode="cover" />
        </Card>
      ))}
    </Container>
  );
}
