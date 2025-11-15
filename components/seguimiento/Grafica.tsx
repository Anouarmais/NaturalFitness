import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter } from "victory-native";
import { getRegistros } from "../../database/registros";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const chartHeight = Math.min(screenHeight * 0.4, 300);

interface Registro {
  id: number;
  peso: number | null;
  grasa: number | null;
  masa: number | null;
  imc: number | null;
  fecha: string;
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: transparent;
  margin-top: 50px;
`;

const WeightWrapper = styled(Animated.View)`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-top: 10px;
`;

const WeightText = styled(Animated.Text)`
  font-size: 58px;
  font-family: "Poppins_700Bold";
  color: #111;
  text-align: center;
  letter-spacing: -1px;
`;

const UnitText = styled(Animated.Text)`
  font-size: 20px;
  color: #555;
  margin-left: 6px;
  margin-bottom: 12px;
`;

const ChartWrapper = styled.View`
  align-items: center;
  margin-top: 40px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;
const StatBox = styled.TouchableOpacity<{ selected?: boolean }>`
  align-items: center;
  justify-content: center;
  width: 95px;
  height: 90px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  shadow-color: #ffffffff;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  border-width: ${({ selected }: { selected?: boolean }) =>
    selected ? "2px" : "1px"};
  border-color: ${({ selected }: { selected?: boolean }) =>
    selected ? "#d1a200" : "rgba(0,0,0,0.05)"};
  transform: ${({ selected }: { selected?: boolean }) =>
    selected ? "scale(1.05)" : "scale(1)"};
`;

const StatValue = styled.Text<{ selected?: boolean }>`
  font-size: 22px;
  font-family: "Poppins_700Bold";
  color: ${({ selected }: { selected?: boolean }) =>
    selected ? "#d1a200" : "#222"};
`;

const StatUnit = styled.Text`
  font-size: 12px;
  color: #666;
  margin-top: -1px;
`;

const StatLabel = styled.Text<{ selected?: boolean }>`
  font-size: 11px;
  color: ${({ selected }: { selected?: boolean }) =>
    selected ? "#d1a200" : "#777"};
  font-family: "Poppins_500Medium";
  margin-top: 4px;
  text-align: center;
  letter-spacing: 0.3px;
`;


const fadeAnimation = (anim: Animated.Value) => {
  Animated.sequence([
    Animated.timing(anim, { toValue: 0, duration: 150, useNativeDriver: true }),
    Animated.timing(anim, { toValue: 1, duration: 200, useNativeDriver: true }),
  ]).start();
};

export default function WeightGraphCard() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [metric, setMetric] = useState<"peso" | "grasa" | "masa">("peso");
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // 🔹 Cargar los registros una sola vez al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      const data = await getRegistros();
      if (data && data.length > 0) {
        const reversed = data.reverse();
        setRegistros(reversed);
        setSelectedIndex(reversed.length - 1);
      }
    };
    cargarDatos();
  }, []);

  const dataPoints = registros.map((r, i) => ({
    x: i,
    y: r[metric] ?? 0,
    date: new Date(r.fecha).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "numeric",
    }),
  }));

  const dates = dataPoints.map((d) => d.date);
  const minY = registros.length > 0 ? Math.min(...registros.map(r => r[metric] ?? 0)) - 0.5 : 0;
  const maxY = registros.length > 0 ? Math.max(...registros.map(r => r[metric] ?? 0)) + 0.5 : 100;

  const selectedRegistro = selectedIndex !== null ? registros[selectedIndex] : null;
  const currentValue =
    metric === "peso" ? selectedRegistro?.peso :
    metric === "grasa" ? selectedRegistro?.grasa :
    selectedRegistro?.masa;

  const unit = metric === "peso" ? "Kg" : metric === "grasa" ? "%" : "Kg";

  const handleMetricChange = (m: "peso" | "grasa" | "masa") => {
    setMetric(m);
    fadeAnimation(fadeAnim);
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WeightWrapper>
          <WeightText style={{ opacity: fadeAnim }}>
            {currentValue?.toFixed(1) ?? "-"}
          </WeightText>
          <UnitText style={{ opacity: fadeAnim }}>{unit}</UnitText>
        </WeightWrapper>

        <ChartWrapper>
          <View style={{ width: screenWidth * 0.9, alignItems: "center" }}>
            <VictoryChart
              padding={{ top: 10, bottom: 50, left: 55, right: 30 }}
              domain={{ y: [minY, maxY] }}
              height={chartHeight}
              width={screenWidth * 0.9}
              style={{ background: { fill: "transparent" } }}
            >
              <VictoryAxis
                dependentAxis
                tickFormat={(t) => `${t}${unit}`}
                style={{
                  axis: { stroke: "transparent" },
                  ticks: { stroke: "transparent" },
                  tickLabels: { fill: "#555", fontSize: 12, fontFamily: "Poppins_400Regular" },
                  grid: { stroke: "rgba(0,0,0,0.08)" },
                }}
              />
              <VictoryAxis
                tickValues={dataPoints.map((d) => d.x)}
                tickFormat={dates}
                style={{
                  axis: { stroke: "transparent" },
                  ticks: { stroke: "transparent" },
                  tickLabels: { fill: "#555", fontSize: 10 },
                }}
              />
              <VictoryLine
                interpolation="monotoneX"
                data={dataPoints}
                x="x"
                y="y"
                style={{
                  data: { stroke: "#FFD700", strokeWidth: 3, opacity: 0.9 },
                }}
              />
              <VictoryScatter
                data={dataPoints.map((p, index) => ({ ...p, index }))}
                x="x"
                y="y"
                size={(d) => (d.index === selectedIndex ? 9 : 6)}
                style={{
                  data: {
                    fill: (d) => (d.index === selectedIndex ? "#FFD700" : "rgba(255,245,109,0.5)"),
                    stroke: "#222",
                    strokeWidth: (d) => (d.index === selectedIndex ? 3 : 1.5),
                  },
                }}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onPressIn: (evt, clickedProps) => {
                        setSelectedIndex(clickedProps.index);
                        return [];
                      },
                    },
                  },
                ]}
              />
            </VictoryChart>
          </View>
        </ChartWrapper>

        {selectedRegistro && (
          <StatsContainer>
            <StatBox selected={metric === "peso"} onPress={() => handleMetricChange("peso")}>
              <StatValue selected={metric === "peso"}>{selectedRegistro.peso?.toFixed(1) ?? "-"}</StatValue>
              <StatUnit>kg</StatUnit>
              <StatLabel selected={metric === "peso"}>Peso</StatLabel>
            </StatBox>

            <StatBox selected={metric === "grasa"} onPress={() => handleMetricChange("grasa")}>
              <StatValue selected={metric === "grasa"}>{selectedRegistro.grasa?.toFixed(1) ?? "-"}</StatValue>
              <StatUnit>%</StatUnit>
              <StatLabel selected={metric === "grasa"}>Grasa corporal</StatLabel>
            </StatBox>

            <StatBox selected={metric === "masa"} onPress={() => handleMetricChange("masa")}>
              <StatValue selected={metric === "masa"}>{selectedRegistro.masa?.toFixed(1) ?? "-"}</StatValue>
              <StatUnit>kg</StatUnit>
              <StatLabel selected={metric === "masa"}>M. muscular</StatLabel>
            </StatBox>
          </StatsContainer>
        )}
      </ScrollView>
    </Container>
  );
}
