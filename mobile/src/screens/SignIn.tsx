import { Center, Text, Icon } from "native-base";
import { Fontisto } from "@expo/vector-icons";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export const SingnIn = () => {

  //instancia o contexto dos dados do usuário
  const { signIn, user } = useAuth();

  console.log('Dados do usuário: ' + user.name + '/' + user.avatarUrl);
  

  return (
    <Center flex={1} bg="gray.900" p="7">
      <Logo width={212} height={40} />
      <Button
        onPress={signIn}
        mt="12"
        type="SECONDARY"
        title="ENTRAR COM GOOGLE"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
      />

      <Text mt="4" color="white" textAlign="center">
        Não utilizaremos nenhuma informação além {"\n"} do seu e-mail para
        criação de sua conta.
      </Text>
    </Center>
  );
};
