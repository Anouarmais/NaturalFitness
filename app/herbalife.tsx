import { useRouter } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

const mainColor = "#FFD700";

const Container = styled.View`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
`;

const Header = styled.View`
  width: 100%;
  margin-bottom: 15px;
  align-items: flex-start;
`;

const AppTitle = styled.Text`
  font-size: 22px;
  font-family: "Poppins_700Bold";
  color: #222;
  margin-bottom: 5px;
`;

const Underline = styled.View`
  width: 60px;
  height: 3px;
  background-color: ${mainColor};
  border-radius: 2px;
`;

/* 🔥 CARD CON TOQUE PREMIUM EN AMARILLO */
const Card = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  border-radius: 18px;
  padding: 14px;

  align-items: center;
  justify-content: space-between;
 margin-bottom: 24px;
  border-left-width: 6px;
  border-left-color: ${mainColor};

  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.06);

  elevation: 4;
  height: 105px;
`;

const Info = styled.View`
  flex: 1;
  margin-right: 10px;
`;

const Title = styled.Text`
  font-family: "Poppins_700Bold";
  font-size: 18px;
  color: #000;
`;

const Description = styled.Text`
  font-family: "Poppins_400Regular";
  font-size: 13px;
  color: #555;
  margin-top: 3px;
`;

const SupplementImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 12px;
`;
type AlimentacionRoute =
  | "/Alimentacion/deporte"
  | "/Alimentacion/packs"
  | "/Alimentacion/perderPeso"
  | "/Alimentacion/cremas"
  | "/Alimentacion/otros";
export default function HerbalifeCategorias() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

const supplements: {
  title: string;
  description: string;
  image: any; // sigue siendo any si mezclas local y remoto
  route: AlimentacionRoute;
}[] = [
  {
    title: "Deporte",
    description: "Productos para mejorar tu rendimiento y energía.",
    image: { uri: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/1467_Box.png/jcr:content/renditions/cq5dam.web.200.200.png" },
    route: "/Alimentacion/deporte",
  },
  {
    title: "Packs",
    description: "Combinaciones listas para tus objetivos.",
    image: { uri: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/05-May/052Z_Crema_Vainilla_780_Paquete_Desayuno.png/jcr:content/renditions/cq5dam.web.200.200.png" },
    route: "/Alimentacion/packs",
  },
  {
    title: "Perder peso",
    description: "Opciones para ayudarte a bajar grasa saludablemente.",
    image: { uri: "https://assets.herbalifenutrition.com/content/dam/regional/emea/es_es/consumable_content/product-catalog-assets/images/2021/09-Sep/172K_SP_PO_PDMVegan_Square_1300px.jpg/jcr:content/renditions/cq5dam.web.200.200.jpeg" },
    route: "/Alimentacion/perderPeso",
  },
  {
    title: "Cremas",
    description: "Productos de bienestar y uso general.",
    image: require("../assets/images/cremas.png"),
    route: "/Alimentacion/cremas",
  },  
  {
    title: "Otros",
    description: "Productos de bienestar y uso general.",
    image: require("../assets/images/multivitaminico.png"),
    route: "/Alimentacion/otros",
  }
];




  return (
    <Container style={{ paddingTop: insets.top + 10 }}>
      <Header>
        <AppTitle>Alimentación</AppTitle>
        <Underline />
      </Header>

      {supplements.map((supp, idx) => (
        <Card
          key={idx}
          activeOpacity={0.85}
          onPress={() => router.push(supp.route)}
        >
          <Info>
            <Title>{supp.title}</Title>
            <Description>{supp.description}</Description>
          </Info>

          <SupplementImage source={supp.image} resizeMode="cover" />
        </Card>
      ))}
    </Container>
  );
}
