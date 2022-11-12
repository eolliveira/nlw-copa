import { createContext, ReactNode } from "react";

//dados do usuário
interface UserProps {
  name: string;
  avatarUrl: string;
}

//dados do contexto
export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

//armazena o contexto
export const AuthContext = createContext({} as AuthContextDataProps);

interface AuthProviderProps {
  children: ReactNode;
}

//provê o contexto para a aplicação
export function AuthContextProvider({ children }: AuthProviderProps) {
  
  //compartilha função de login com toda a aplicação
  async function signIn() {
    console.log('vamos logar!');
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: "Erick Oliveira",
          avatarUrl: "https://github.com/eolliveira.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
