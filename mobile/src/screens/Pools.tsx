import { VStack, Icon } from "native-base";
import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons";
import React from "react";
import { Header } from "../components/Header";

export const Pools = () => {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />

      <VStack p={4}>
        <VStack mt={8} mb={5}>
          <Button
            leftIcon={
              <Icon
                as={Fontisto}
                name="search"
                color="black"
                size="md"
                mx={2}
              />
            }
            title="BUSCAR BOLÃO POR CÓDIGO"
          />
        </VStack>

        <VStack borderTopWidth={1} borderTopColor={"gray.600"} pt={6}></VStack>
      </VStack>
    </VStack>
  );
};
