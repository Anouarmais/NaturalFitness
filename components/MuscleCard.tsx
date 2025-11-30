import { useRouter } from "expo-router";
import React from "react";
import styled from "styled-components/native";
const mainColor = "#FFD700"; 
interface MuscleCardProps {
  title: string;
  image: any;
  exercisesCount: number;
  extraInfo?: string;
  onPress?: () => void;
}

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
  height: 140px; /* Tamaño medio-alto */
  width: 100%;
`;

const Info = styled.View`
  flex: 1;
  margin-right: 10px;
`;

const Title = styled.Text`
  font-family: "Poppins_700Bold";
  font-size: 22px;
  color: #000;
`;

const SubText = styled.Text`
  font-family: "Poppins_400Regular";
  font-size: 15px;
  color: #777;
  margin-top: 4px;
`;

const Extra = styled.Text`
  font-family: "Poppins_500Medium";
  font-size: 16px;
  color: #efdf00ff;
  margin-top: 6px;
`;

const MuscleImage = styled.Image`
  width: 110px; /* Imagen visible pero no exagerada */
  height: 110px;
  border-radius: 14px;
`;

export default function MuscleCard({
  title,
  image,
  exercisesCount,
  extraInfo,
    onPress, 
}: MuscleCardProps) {

  const router = useRouter();

  return (
    <Card
      activeOpacity={0.85}
      onPress={() =>
        router.push(`/ejercicios/${title.toLowerCase()}`)

      }
    >
      <Info>
        <Title>{title}</Title>
        <SubText>{exercisesCount} ejercicios</SubText>
        {extraInfo && <Extra>{extraInfo}</Extra>}
      </Info>

      <MuscleImage source={image} />
    </Card>
  );
}

