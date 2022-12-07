import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { SingnIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

//centraliza configurações de rotas, para facilitar validações 
export const Routes = () => {

    const { user } = useAuth();

    return (
        <NavigationContainer>
            {/* se usuário logado mostra rotas da aplicação */}
            {user.name ? <AppRoutes /> : <SingnIn />}
        </NavigationContainer>
    );
  };
  