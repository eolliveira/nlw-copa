import { VStack, Icon, useToast, FlatList } from "native-base";
import { Button } from "../components/Button";
import { useCallback, useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Header } from "../components/Header";
import { PoolPros, PoolCard } from "../components/PoolCard";
import { Loading } from "../components/Loading";
import { api } from "../services/api";
import { EmptyPoolList } from "../components/EmptyPoolList";

export const Pools = () => {
  //permite navegação entre as rotas
  const { navigate } = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pools, setPools] = useState<PoolPros[]>([]);

  async function fetchPools() {
    try {
      setIsLoading(true);
      const response = await api.get("pools");
      setPools(response.data.pools);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel listar bolões",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      //executa ha foco na tela(useCallback para performace)
      fetchPools();
    }, [])
  );

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />

      <VStack p={4}>
        <Button
          leftIcon={
            <Icon as={Fontisto} name="search" color="black" size="md" mx={2} />
          }
          title="BUSCAR BOLÃO POR CÓDIGO"
          onPress={() => navigate("find")}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard 
            data={item} 
            onPress={() => navigate('details', { id: item.id })}
            /> 
            
            )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
          px={5}
        />
      )}
    </VStack>
  );
};
