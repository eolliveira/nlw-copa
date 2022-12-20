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
    } catch (error) {
      toast.show({
        title: "Não foi possivel listar os jogos!",
      });
    } finally {
      setIsLoading(false);
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
          onGuessConfirm={() => {}}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
        />
      )}
    />
  );
}
