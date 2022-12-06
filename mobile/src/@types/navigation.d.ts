//define tipos , para rotas disponiveis na aplicação
export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            new: undefined,
            pools: undefined,
            find: undefined,
            //rota que precisa passar parametro
            details: {
                id: string
            }
        }
    }
}