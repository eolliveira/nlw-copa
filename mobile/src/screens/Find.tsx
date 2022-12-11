import { Heading, useToast, VStack } from "native-base";
import { useState } from "react";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export const Find = () => {
  const toast = useToast();
  const { navigate } = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        toast.show({
          title: "Informe o codigo do bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      //inclui usuário logado ao bolão do codigo informado
      await api.post("/pools/join", { code });

      toast.show({
        title: "Bolão incluido com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("pools");
    } catch (error) {

      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === "Pool not found!") {
        toast.show({
          title: "Bolão não encontrado!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (
        error.response?.data?.message === "User is already included in the pool"
      ) {
        toast.show({
          title: "Você ja faz parte desse bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack alignItems="center" mt={5} mx={5}>
        <Heading
          fontFamily="heading"
          color="white"
          mt={8}
          fontSize="xl"
          textAlign="center"
        >
          Encontre um bolão através de seu código único
        </Heading>

        <Input
          onChangeText={setCode}
          value={code}
          placeholder="Qual o código do bolão?"
          mt={10}
          //permite somente maisculas
          autoCapitalize={"characters"}
        />
        <Button
          onPress={handleJoinPool}
          title="BUSCAR BOLÃO"
          mt={3}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
};
