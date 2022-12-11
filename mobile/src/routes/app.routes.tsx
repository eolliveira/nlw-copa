import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Platform } from "react-native";
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { New } from "../screens/New";
import { Pools } from "../screens/Pools";
import { Find } from "../screens/Find";
import { Details } from "../screens/Details";

const { Navigator, Screen } = createBottomTabNavigator();

//rotas da aplicação
export const AppRoutes = () => {
  //hook para pegar cores do tema padrão do projeto
  const { colors, sizes } = useTheme();

  //tamanho passado para os icones
  const size = sizes[6];

  return (
    <Navigator
      screenOptions={{
        //remove cabeçalho padrão
        headerShown: false,
        //deixa texto ao lado do icone
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: "absolute",
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === "android" ? -10 : 0,
        },
      }}
    >
      <Screen
        name="new"
        component={New}
        options={{
          tabBarLabel: "Novo bolão",
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
        }}
      />
      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarLabel: "Meus bolões",
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
        }}
      />
      <Screen
        name="find"
        component={Find}
        options={{
        //remove botão da rota de navBar
         tabBarButton: () => null,
        }}
      />
      <Screen
        name="details"
        component={Details}
        options={{
         tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
};
