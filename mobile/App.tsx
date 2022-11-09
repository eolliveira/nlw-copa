import { Center, NativeBaseProvider, StatusBar, Text } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { THEME } from "./src/styles/theme";
import { Loading } from "./src/components/Loading";
import { SingnIn } from "./src/screens/SignIn";
import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {
  //fontes foram carregadas no device ?
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          //define style a partir do topo da tela
          translucent
        />

        {fontsLoaded ? <SingnIn /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
