import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";

//centraliza configurações de rotas, para facilitar validações 
export const Routes = () => {
    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    );
  };
  