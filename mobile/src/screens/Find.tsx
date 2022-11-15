import { Heading, Text, VStack } from "native-base";
import React from "react";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const Find = () => {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack alignItems="center" mt={5} mx={5}>
        <Heading fontFamily="heading" color="white" mt={8} fontSize="xl" textAlign='center' >
          Encontre um bolão através de seu código único
        </Heading>

        <Input placeholder="Qual o código do bolão?" mt={10} />
        <Button title="BUSCAR BOLÃO" mt={3} />
      </VStack>
    </VStack>
  );
};
