import { useRoute } from "@react-navigation/native";
import { useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { PoolProps } from "../components/PoolCard";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";

interface RouteParams {
  id: string;
}

export const Details = () => {
  const toast = useToast();
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(false);
  const [poolDetails, setPoolDetails] = useState<PoolProps>();

  //pega id vindo do parametro
  const { id } = route.params as RouteParams;

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pools);
      console.log(response.data.pools);
      console.log("-----------------------------------------------");
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possivel listar bolões",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title={id} showBackButton={true} />

      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.id} />
      )}
    </VStack>
  );
};
