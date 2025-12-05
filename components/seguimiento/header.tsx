// components/SeguimientoHeader.js
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { addRegistro } from "../../database/registros";

const { height } = Dimensions.get("window");

const Header = styled.View`
  position: absolute;
  top: 50px;
  right: 20px;
  left: 20px;
  z-index: 10;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AppTitle = styled.Text`
  font-size: 20px;
  font-family: "Poppins_700Bold";
  color: #222;
  letter-spacing: 0.5px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  padding: 6px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: flex-end;
`;

const FormContainer = styled(Animated.View)`
  width: 100%;
  background-color: #fffbea;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 30px 25px 40px;
`;

const Input = styled.TextInput`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 15px;
  font-size: 16px;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #ffc300;
  border-radius: 10px;
  padding: 15px;
  align-items: center;
`;

const SaveText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export default function SeguimientoHeader() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const [peso, setPeso] = useState("");
  const [grasa, setGrasa] = useState("");
  const [masa, setMasa] = useState("");
  const [agua, setAgua] = useState("");
  const [edadMetabolica, setEdadMetabolica] = useState("");
  const [visceral, setVisceral] = useState("");
  const [cintura, setCintura] = useState("");
  const [cadera, setCadera] = useState("");

  const openForm = () => {
    setVisible(true);   
    Animated.timing(slideAnim, {
      toValue: height * 0.1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeForm = () => {
    Keyboard.dismiss();
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardShow = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(slideAnim, {
        toValue: height - e.endCoordinates.height - 20, 
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    const keyboardHide = Keyboard.addListener(hideEvent, () => {
      Animated.timing(slideAnim, {
        toValue: height * 0.1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  const handleSave = async () => {
    console.log("📥 Guardando registro con valores:", {
      peso, grasa, masa, agua, edadMetabolica, visceral, cintura, cadera
    });

    await addRegistro(
      Number(peso),
      grasa ? Number(grasa) : null,
      masa ? Number(masa) : null,
      agua ? Number(agua) : null,
      edadMetabolica ? Number(edadMetabolica) : null,
      visceral ? Number(visceral) : null,
      cintura ? Number(cintura) : null,
      cadera ? Number(cadera) : null
    );

    closeForm();
    setPeso(""); setGrasa(""); setMasa("");
    setAgua(""); setEdadMetabolica(""); setVisceral("");
    setCintura(""); setCadera("");

    setTimeout(() => {
      router.replace("/seguimiento");
    }, 400);
  };

  return (
    <>
      <Header>
        <AppTitle>Seguimiento</AppTitle>

        <AddButton onPress={openForm}>
          <Ionicons name="add" size={32} color="#FFC300" />
        </AddButton>
      </Header>

      <Modal visible={visible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeForm}>
          <Overlay>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
              >
                <FormContainer style={{ transform: [{ translateY: slideAnim }] }}>
                  <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
                    Añadir Registro
                  </Text>

                  <Input placeholder="Peso (kg)" placeholderTextColor="#999" keyboardType="numeric" value={peso} onChangeText={setPeso} />
                  <Input placeholder="% Grasa corporal" placeholderTextColor="#999" keyboardType="numeric" value={grasa} onChangeText={setGrasa} />
                  <Input placeholder="Masa muscular (kg)" placeholderTextColor="#999" keyboardType="numeric" value={masa} onChangeText={setMasa} />
                  <Input placeholder="% Agua corporal" placeholderTextColor="#999" keyboardType="numeric" value={agua} onChangeText={setAgua} />
                  <Input placeholder="Edad metabólica (años)" placeholderTextColor="#999" keyboardType="numeric" value={edadMetabolica} onChangeText={setEdadMetabolica} />
                  <Input placeholder="Grasa visceral (nivel)" placeholderTextColor="#999" keyboardType="numeric" value={visceral} onChangeText={setVisceral} />
                  <Input placeholder="Cintura (cm)" placeholderTextColor="#999" keyboardType="numeric" value={cintura} onChangeText={setCintura} />
                  <Input placeholder="Cadera (cm)" placeholderTextColor="#999" keyboardType="numeric" value={cadera} onChangeText={setCadera} />

                  <SaveButton onPress={handleSave}>
                    <SaveText>Guardar</SaveText>
                  </SaveButton>

                  <TouchableOpacity onPress={closeForm} style={{ marginTop: 20, alignItems: "center" }}>
                    <Text style={{ color: "#888" }}>Cancelar</Text>
                  </TouchableOpacity>
                </FormContainer>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </Overlay>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
