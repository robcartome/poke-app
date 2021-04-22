import styled from "styled-components";
import spinner from "../assets/spinner2.svg";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export const CardPokemon = ({ name, url }) => {
  const state = {
    name: "",
    imageUrl: "",
    pokemonId: "",
    imageLoading: true,
    toManyRequests: false,
  };
  const [pokemon, setPokemon] = useState(state);

  useEffect(() => {
    const pokemonId = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`;
    setPokemon({ ...pokemon, name, imageUrl, pokemonId });
  }, []);

  // console.log("card:", pokemon);
  return (
    <StyledCard>
      <StyledLink to={`pokemon/${pokemon.pokemonId}`}>
      <CardHeader>
        {pokemon.imageLoading ? (
          <img src={spinner} style={{ width: "5em", height: "5em" }} />
        ) : null}
        <AvatarPokemon
          src={pokemon.imageUrl}
          onLoad={() => setPokemon({ ...pokemon, imageLoading: false })}
          onError={() => setPokemon({ ...pokemon, toManyRequests: true })}
          style={
            pokemon.toManyRequests
              ? { display: "none" }
              : pokemon.imageLoading
              ? null
              : { display: "block" }
          }
        />
      </CardHeader>
      <CardBody>
        <h4>{name.trim().replace(/^\w/, (c) => c.toUpperCase())}</h4>
        <div>
        {/* Types */}
        </div>
        <p>#0{pokemon.pokemonId}</p>
      </CardBody>
      </StyledLink>

    </StyledCard>
  );
};

const AvatarPokemon = styled.img`
  width: 110px;
  height: 110px;
  display: none;
`;

const StyledLink = styled(Link)`
text-decoration: none;
`;

const StyledCard = styled.div`
  background: #FFB87D;
  border-radius: 30px;
  padding: 0px 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 156px;
  max-height: 212px;
  margin-bottom: 60px;
  &:hover {
    box-shadow: 0px 0px 10px 3px rgba(4, 5, 4, 0.3);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
    opacity: 0.95;
    //cursor: pointer;
  }
`;

const CardHeader = styled.div`
  background: linear-gradient(180deg, #FFB87D 0%, #fafafa 100%);
  //filter: blur(20px);
  filter: drop-shadow(0px 0px 25px #FFB87D);
  width: 130px;
  height: 130px;
  transform: translateY(-38px);
  border-radius: 50%;
  margin: 0px;
  display:flex;
  align-items:center;
  justify-content: center;
`;

const CardBody = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -40px;
  padding: 0;
  line-height: 8px;
  font-size: 22px;
`;
