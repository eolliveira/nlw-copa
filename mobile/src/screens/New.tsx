import { Heading, Text, Toast, useToast, VStack } from "native-base";
import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";

export const New = () => {
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handlePoolCreate() {
    //verifica se titulo é valido
    if (!title.trim()) {
      return toast.show({
        title: "Informe um nome para seu Bolão!",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);

      await api.post("/pools", { title });

      toast.show({
        title: "Bolão criado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possivel criar o bolão!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Criar novo bolão" showBackButton />

      <VStack alignItems="center" mt={8} mx={5}>
        <Logo width={150} />

        <Heading fontFamily="heading" color="white" mt={8} fontSize="xl">
          Crie seu próprio bolão da copa {"\n"} e compartilhe com amigos!
        </Heading>

        <Input
          placeholder="Qual o nome do seu bolão"
          mt={8}
          onChangeText={setTitle}
          value={title}
        />
        <Button
          title="CRIAR MEU BOLÃO"
          mt={3}
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

        <Text color="gray.200" textAlign="center" fontSize="sm" mt={5} px={10}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
};
