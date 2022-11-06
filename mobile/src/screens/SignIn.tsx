import { Center } from "native-base";

import Logo from '../assets/logo.svg'
import { Button } from "../components/Button";

export const SingnIn = () => {
  return (
    <Center flex={1} bg='gray.900'>
       <Logo width={212} height={40} />
       <Button title="ENTRAR COM GOOGLE"  />
    </Center>
  );
};
