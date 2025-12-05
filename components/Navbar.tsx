import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import styled from "styled-components/native";

/* Contenedor de la barra */
const Container = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  border-top-width: 0.5px;
  border-top-color: rgba(167, 12, 12, 0.2);
  elevation: 0;
  shadow-opacity: 0;
`;

/* Botón por cada tab */
const IconButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

/* Tipado del label */
interface LabelProps {
  active: boolean;
}

/* Label con color dependiente de si está activo */
const Label = styled.Text<LabelProps>`
  font-size: 12px;
  margin-top: 2px;
  color: ${({ active }: LabelProps) =>
    active ? "#FFD700" : "rgba(100, 100, 100, 0.6)"};
`;

/* Tipo para las pestañas */
type Tab = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs: Tab[] = [
    { name: "/", icon: "home-outline", label: "Ejercicios" },
    { name: "/seguimiento", icon: "barbell-outline", label: "Seguimiento" },
    { name: "/premium", icon: "star-outline", label: "Premium" },
    { name: "/herbalife", icon: "nutrition-outline", label: "HerbaLife" },
    { name: "/trabajaconNosotros", icon: "cash-outline", label: "Ingresos Extra" },
  ];

  // 🔹 Función que evita navegar si ya estamos en la misma ruta
  const navigateTo = (path: any) => {
    if (pathname !== path) {
      router.push(path as any);
    }
  };

  return (
    <Container>
      {tabs.map((tab) => {
        const isActive = pathname === tab.name;
        return (
          <IconButton key={tab.name} onPress={() => navigateTo(tab.name)}>
            <Ionicons
              name={tab.icon as any}
              size={isActive ? 32 : 18} // 🔹 tamaño según activo
              color={isActive ? "#FFD700" : "rgba(100, 100, 100, 0.6)"}
            />
            <Label active={isActive}>{tab.label}</Label>
          </IconButton>
        );
      })}
    </Container>
  );
}
