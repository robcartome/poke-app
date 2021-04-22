import styled from "styled-components";
import { useState } from "react";
import { Icon } from "./Icon";

export const Search = () => {
  const [mode, setMode] = useState(false);

  return (
    <StyleDiv>
      <StyleDiv>
        <StyleDiv2>
          {mode ? (
            <Icon type="left" size={18}></Icon>
          ) : (
            <Icon type="search" size={18}></Icon>
          )}
        </StyleDiv2>
        <StyleInput
          name="search"
          placeholder="search"
          onChange={(e) => {
            e.target.value == "" ? setMode(false) : setMode(true);
          }}
        ></StyleInput>
      </StyleDiv>
    </StyleDiv>
  );
};

const StyleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width:85%;
  margin: auto;
`;
const StyleDiv2 = styled.div`
  display: flex;
  :focus-within {
    display: none;
  }
`;
const StyleInput = styled.input`
  background: rgba(0, 0, 0, 0.12);
  border-radius: 18px;
  font-size: 18px;
  border: none;
  width: 100%;
  padding: 8px;
  :focus {
    outline: none;
  }
`;
