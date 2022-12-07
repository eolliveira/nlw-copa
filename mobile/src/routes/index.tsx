import { NavigationContainer } from "@react-navigation/native";
import { SingnIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

//centraliza configurações de rotas, para facilitar validações 
export const Routes = () => {
    return (
        <NavigationContainer>
            {/* teste */}
            <SingnIn />
        </NavigationContainer>
    );
  };
  