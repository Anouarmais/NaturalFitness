import React from "react";
import { Linking } from "react-native";
import styled from "styled-components/native";

const mainColor = "#FFD700";

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
  flex-direction: row;
  background-color: #fff;
  border-radius: 18px;
  padding: 16px;
  margin-bottom: 18px;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.05);
  elevation: 3;
`;

const Info = styled.View`
  flex: 1;
  margin-right: 10px;
`;

const Title = styled.Text`
  font-family: "Poppins_700Bold";
  font-size: 20px;
  color: #000;
`;

const Description = styled.Text`
  font-family: "Poppins_400Regular";
  font-size: 14px;
  color: #555;
  margin-top: 4px;
`;

const OrderButton = styled.TouchableOpacity`
  margin-top: 8px;
  background-color: ${mainColor};
  padding: 8px 12px;
  border-radius: 10px;
  align-self: flex-start;
`;

const OrderText = styled.Text`
  color: #000;
  font-family: "Poppins_700Bold";
  font-size: 14px;
`;

const SupplementImage = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 14px;
`;

export default function ComplementosAlimentarios() {
  const supplements = [
    {
      title: "Proteína",
      description: "Ayuda a reparar y construir músculo tras el entrenamiento.",
      image: require("../assets/images/proteina.png"),
    },
    {
      title: "Creatina",
      description: "Aumenta fuerza y rendimiento en ejercicios de alta intensidad.",
      image: require("../assets/images/creatina.png"),
    },
    {
      title: "BCAA",
      description: "Aminoácidos que ayudan a reducir fatiga y favorecer la recuperación.",
      image: require("../assets/images/bcaa.png"),
    },
    {
      title: "Multivitamínico",
      description: "Complementa la dieta con vitaminas y minerales esenciales.",
      image: require("../assets/images/multivitaminico.png"),
    },
  ];

  const orderNow = (title: string) => {
    const phoneNumber = "34610101096";
    const message = encodeURIComponent(`Hola, quiero pedir ${title}`);
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${message}`);
  };

  return (
    <Container>
      <Header>
        <AppTitle>Complementos Alimentarios</AppTitle>
        <Underline />
      </Header>

      {supplements.map((supp, idx) => (
        <Card key={idx} activeOpacity={0.85}>
          <Info>
            <Title>{supp.title}</Title>
            <Description>{supp.description}</Description>
            <OrderButton onPress={() => orderNow(supp.title)}>
              <OrderText>Ordénalo ya</OrderText>
            </OrderButton>
          </Info>
          <SupplementImage source={supp.image} resizeMode="cover" />
        </Card>
      ))}
    </Container>
  );
}
