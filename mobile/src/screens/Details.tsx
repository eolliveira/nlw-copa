import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { PoolProps } from "../components/PoolCard";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { PoolHeader } from "../components/PoolHeader";
import { Option } from "../components/Option";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Share } from "react-native";

interface RouteParams {
  id: string;
}

export const Details = () => {
  const toast = useToast();
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(false);
  const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
    "guesses"
  );
  const [poolDetails, setPoolDetails] = useState<PoolProps>();

  //pega id vindo do parametro
  const { id } = route.params as RouteParams;

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel listar bolões",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    Share.share({
      message: poolDetails.code
    })
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title={poolDetails.title} showBackButton={true} showShareButton={true} onSheare={handleCodeShare} />

      {poolDetails?._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />

          <HStack bgColor="gray.800" rounded="sm" mb="5" p={2}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected === "guesses"}
              onPress={() => setOptionSelected("guesses")}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === "ranking"}
              onPress={() => setOptionSelected("ranking")}
            />
          </HStack>
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails?.code} onShare={handleCodeShare} />
      )}
    </VStack>
  );
};
