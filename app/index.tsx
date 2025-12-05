import React from "react";
import styled from "styled-components/native";
import MuscleCard from "../components/MuscleCard";
const mainColor = "#FFD700"; // 🟡 Color principal
const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  padding-top: 50px;
`;
const Underline = styled.View`
  width: 60px;
  height: 3px;
  background-color: ${mainColor};
  border-radius: 2px;
    margin-bottom: 20px;
`;
const Header = styled.Text`
  font-family: "Poppins_700Bold";
  font-size: 24px;
  color: #000;
      margin-bottom: 6px;

`;

export default function Index() {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <Header>Ejercicios</Header>
        <Underline />
      <MuscleCard
        title="Pecho"
        image={require("../assets/images/pecho.png")}
        exercisesCount={10}
        extraInfo="Fuerza y volumen"
      />

      <MuscleCard
        title="Espalda"
        image={require("../assets/images/espalda.png")}
        exercisesCount={9}
        extraInfo="Postura y control"
      />

      <MuscleCard
        title="Piernas"
        image={require("../assets/images/pierna.png")}
        exercisesCount={10}
        extraInfo="Fuerza y potencia"
      />

      <MuscleCard
        title="Hombro"
        image={require("../assets/images/homro.png")}
        exercisesCount={9}
        extraInfo="Estabilidad y movilidad"
      />
        <MuscleCard
        title="Biceps"
        image={require("../assets/images/biceps.png")}
        exercisesCount={9}
        extraInfo="Estabilidad y movilidad"
      />
      <MuscleCard
        title="Gluteos"
        image={require("../assets/images/gluteo.png")}
        exercisesCount={8}
        extraInfo="Fuerza y potencia"
      />
      <MuscleCard
        title="Triceps"
        image={require("../assets/images/triceps.png")}
        exercisesCount={7}
        extraInfo="Fuerza y potencia"
      />

    </Container>
  );
}
