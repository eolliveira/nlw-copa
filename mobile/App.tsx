import { StatusBar } from "expo-status-bar";
import { Center, NativeBaseProvider, Text } from "native-base";

import { THEME } from './src/styles/theme'

export default function App() {
  return (
    <NativeBaseProvider theme={ THEME }>
      <Center flex={1} bgColor="green.500">
        <Text color="amber.400" >Hello World</Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}