import styled from "styled-components";
import { useEffect, useState } from "react";
import PokemonsService from "../services/pokemons_service";
import { CardPokemon } from "./CardPokemon";
import { Search } from "./Search";

export const ListPokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    async function fetchPokemons() {
      const pokemonsService = new PokemonsService();
      const pokemons = await pokemonsService.list();
      setPokemons(pokemons.results);
    }
    fetchPokemons();
  }, []);

  return (
    <StyledContainer>
      <Search />
      <StyledList>
        {pokemons.map((p) => {
          return p.name ? (
            <CardPokemon key={p.name} name={p.name} url={p.url} />
          ) : (
            ""
          );
        })}
      </StyledList>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

const StyledList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
  gap: 25px;
`;
