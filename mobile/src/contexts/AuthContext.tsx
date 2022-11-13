import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSection from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

//redirecionameto
WebBrowser.maybeCompleteAuthSession();

//dados do usuário
interface UserProps {
  name: string;
  avatarUrl: string;
}

//dados do contexto
export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: Boolean;
  signIn: () => Promise<void>;
}

//armazena o contexto
export const AuthContext = createContext({} as AuthContextDataProps);

interface AuthProviderProps {
  children: ReactNode;
}

//provê o contexto para a aplicação
export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  //verifica se se usuário esta se altenticando
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "1077667841357-iv4u8rolfr8po0edsuckmt5jre1tfn0v.apps.googleusercontent.com",
    //retorna link de redirecionamento de autenticação do google(deve estar logado na conta expo)
    redirectUri: AuthSection.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  //compartilha função de login com toda a aplicação
  async function signIn() {
    try {
      setIsUserLoading(true);

      //inicia fluxo de altenticação
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function SignInWithGoogle(access_token: string) {
    console.log("TOKEN AUTENTICAÇÃO GOOGLE: " + access_token);
  }

  //vai escutar a resposta(captura token)
  useEffect(() => {
    if (response?.type === "success" && response.authentication.accessToken) {
      SignInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
