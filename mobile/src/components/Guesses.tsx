import { FlatList, useToast } from "native-base";
import { useState, useEffect } from "react";
import { Game, GameProps } from "../components/Game";
import { api } from "../services/api";
import { Loading } from "./Loading";

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pool/${poolId}/games`);
      setGames(response.data.games);
      console.log(response.data.games);
    } catch (error) {
      toast.show({
        title: "Não foi possivel listar os jogos!",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      //verifica se placares foram informados
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: "informe o placar do jogo!",
          placement:'top',
          bgColor: 'red.500'
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        SecondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: "Palpite realizado com sucesso!",
      });

      fetchGames();
    } catch (error) {
      console.log(error);
      
      if (error.response?.data?.message === "Palpites para esse jogo, ja foram encerradas") {
        toast.show({
          title: "Palpites para esse jogo, ja foram encerrados!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      // toast.show({
      //   title: "Não foi possivel fazer o palpite!",
      // });
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  return isLoading ? (
    <Loading />
  ) : (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
        />
      )}
    />
  );
}
