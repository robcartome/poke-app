import styled from "styled-components";
import { useEffect, useState } from "react";
import PokemonsService from "../services/pokemons_service";
import { Link, useParams } from "react-router-dom";
import pokeballImg from "../assets/pokeball.svg";
import { Icon } from "../components/Icon";
import spinner from "../assets/spinner2.svg";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

export const ShowPokemon = () => {
  let { pokemonId } = useParams();
  const state = {
    name: "",
    pokemonId: "",
    imageUrl: "",
    types: [],
    description: "",
    statTitleWidth: 3,
    statBarWidth: 9,
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: "",
    },
    height: "",
    weight: "",
    eggGroups: "",
    catchRate: "",
    abilities: "",
    evs: "",
    themeColor: "#EF5350",
  };
  const [pokemon, setPokemon] = useState(state);

  useEffect(() => {
    async function fetchPokemon() {
      const pokemonsService = new PokemonsService();
      const pokemonInfo = await pokemonsService.showPokemon(pokemonId);
      const name = pokemonInfo.name;
      const imageUrl = pokemonInfo.sprites.front_default;
      let { hp, attack, defense, speed, specialAttack, specialDefense } = "";
      pokemonInfo.stats.map((stat) => {
        switch (stat.stat.name) {
          case "hp":
            hp = stat["base_stat"];
            break;
          case "attack":
            attack = stat["base_stat"];
            break;
          case "defense":
            defense = stat["base_stat"];
            break;
          case "speed":
            speed = stat["base_stat"];
            break;
          case "special-attack":
            specialAttack = stat["base_stat"];
            break;
          case "special-defense":
            specialDefense = stat["base_stat"];
            break;
          default:
            break;
        }
      });
      // Tamaños del pokemon: Convertir decimetros a centimetros / Peso en Kg
      const height = pokemonInfo.height / 10; // Mtr
      const weight = (pokemonInfo.weight * 10) / 100; // Kg
      const types = pokemonInfo.types.map((type) => type.type.name);
      // Color Background
      const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
      const abilities = pokemonInfo.abilities
        .map((ability) => {
          return ability.ability.name
            .toLowerCase()
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");
      //Puntos de Esfuerzo
      const evs = pokemonInfo.stats
        .filter((stat) => {
          if (stat.effort > 0) {
            return true;
          }
          return false;
        })
        .map((stat) => {
          return `${stat.effort} ${stat.stat.name
            .toLowerCase()
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")}`;
        })
        .join(", ");

      //Obtener la descripcion
      const pokemonSpecies = await pokemonsService.showPokemonSpecies(
        pokemonId
      );

      let description = "";
      pokemonSpecies.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });
      const catchRate = Math.round((100 / 255) * pokemonSpecies.capture_rate); // Taza de captura
      const eggGroups = pokemonSpecies.egg_groups
        .map((group) => {
          return group.name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      setPokemon({
        ...pokemon,
        name,
        pokemonId,
        imageUrl,
        types,
        description,
        stats: {
          hp,
          attack,
          defense,
          speed,
          specialAttack,
          specialDefense,
        },
        height,
        weight,
        eggGroups,
        catchRate,
        abilities,
        evs,
        themeColor,
      });
    }
    fetchPokemon();
  }, []);
  return (
    <WrapperStyle backColor={pokemon.themeColor}>
      <HeadStyle>
        <Nav>
          <Link to={`/`}>
            <Icon type="arrowLeft" size={24} fill={"#ffffff"} />
          </Link>

          <p>#0{pokemonId}</p>
        </Nav>
        <img src={pokeballImg} style={{ width: "5em", height: "5em" }} />
      </HeadStyle>
      <BodyStyle>
        <AvatarPokemon src={pokemon.imageUrl} />
        <InfoStyle>
          <h1>
            {pokemon.name
              .toLowerCase()
              .split(" ")
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ")}
          </h1>
          <div>
            {pokemon.types.map((type) => (
              <span
                key={type}
                style={{
                  backgroundColor: `#${TYPE_COLORS[type]}`,
                  color: "white",
                }}
              >
                {type
                  .toLowerCase()
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </span>
            ))}
          </div>
          <p>{pokemon.description}</p>
        </InfoStyle>
        <h4>STATS</h4>
        <StatStyle>
          <div>
            <h6>Height:</h6>
            <div>
              <p>{pokemon.height} Mt.</p>
            </div>
            <h6>Weight:</h6>
            <div>
              <p>{pokemon.weight} Kg.</p>
            </div>
            <h6>Catch Rate:</h6>
            <div>
              <p>{pokemon.catchRate}%</p>
            </div>
          </div>

          <div>
            <div>
              <div>
                <h6>Egg Groups:</h6>
              </div>
              <div>
                <p>{pokemon.eggGroups} </p>
              </div>
              <div>
                <p>Hatch Steps:</p>
              </div>
              <div>
                <p>{pokemon.hatchSteps}</p>
              </div>
              <div>
                <h6>Abilities:</h6>
              </div>
              <div>
                <p>{pokemon.abilities}</p>
              </div>
              <div>
                <h6>EVs:</h6>
              </div>
              <div>
                <p>{pokemon.evs}</p>
              </div>
            </div>
          </div>
        </StatStyle>
      </BodyStyle>
    </WrapperStyle>
  );
};

const WrapperStyle = styled.div`
  background: linear-gradient(
    20deg,
    #${(props) => props.backColor} 37.6%,
    #666 98.4%
  );
`;

const HeadStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 21px 70px 30px 70px;
  color: #ffffff;
  font-size: 24px;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 40px;
  text-decoration: none;
`;

const BodyStyle = styled.div`
  background: #fafafa;
  border-radius: 48px 48px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  height: 100vh;
  & > img {
    transform: translateY(-125px);
    opacity: 0.95;
  }
`;

const AvatarPokemon = styled.img`
  width: 200px;
  height: 200px;
  // display: none;
`;

const InfoStyle = styled.div`
  margin-top: -150px;
  text-align: center;
`;

const StatStyle = styled.div`
display:flex;
// gap: 30px;
justify-content: space-around;
width: 100%;
`;
