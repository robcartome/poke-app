import { ListPokemon } from "../components/ListPokemon";
import styled from 'styled-components';
export const Board = ()=>{
return (
  <StyledBoard>
  <h2>POKEROB</h2>
  <ListPokemon />
  </StyledBoard>
)
}

const StyledBoard = styled.div`
  padding: 0px 20px;
  & > h2 {
    color: #FA4A0C;
  }
`;