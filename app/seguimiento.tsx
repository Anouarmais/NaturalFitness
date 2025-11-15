import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import styled from "styled-components/native";
import WeightGraphCard from "../components/seguimiento/Grafica";
import SeguimientoHeader from "../components/seguimiento/header";

const Background = styled.View`
  flex: 1;
  position: relative;
`;

const Gradient = styled(LinearGradient).attrs({
  // 🎨 degradado más alto y más suave
  colors: ["#FFF380", "#FFFFFF"],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0.6 }, // más alto (antes era y:1)
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Content = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: 50px;
  background-color: transparent;
`;

export default function Seguimiento() {
  return (
    <Background>
      <Gradient />
      <Content>
        <SeguimientoHeader />
        <WeightGraphCard />
      </Content>
    </Background>
  );
}
