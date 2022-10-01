import React from "react";
import styled from "styled-components";
import logo from "../assets/img/logo.png";

function TelaInicial({
  flashs,
  setRenderizarFlashs,
  setValueSelect,
  setMetaDeZap,
  valueSelect
}) {
  let valorInput = "";

  let [textoBotao, setTextoBotao] = React.useState("Definir Meta Zap");
  let [deckOk, setDeckOk] = React.useState(false);

  const opcoes = [];
  flashs.forEach((f) => {
    if (!opcoes.includes(f.categoria)) {
      opcoes.push(f.categoria);
    }
  });

  function mensagemErro(){
    alert('calma ai')
  }

  function definiStap() {
    if (deckOk) {
      if (!isNaN(valorInput)) {
        if (Number.isInteger(valorInput)) {
          setMetaDeZap(valorInput);
          renderizarFlashs();
        } else {
          alert("error: número inválido");
          return;
        }
      } else {
        alert("error: não é número");
        return;
      }
    } else {
      escolheDeck();
    }
  }

  function escolheDeck() {
    if(valueSelect){
    setTextoBotao("Iniciar Recall");
    setDeckOk(true);
    }else{
      mensagemErro()
    }
  }

  function renderizarFlashs() {
    setRenderizarFlashs(true);
    console.log("ok");
  }

  function pegaValor(e) {
    setValueSelect(e.value);
  }

  function atualizaValorInput(value) {
    valorInput = Number(value);
    console.log(valorInput);
  }

  return (
    <TelaInicio>
      <img src={logo} alt="logo" />
      <DeckMain>
        <span>ZapRecall</span>
        {deckOk ? (
          <Input
            onChange={({ target }) => atualizaValorInput(target.value)}
            placeholder="Digite sua meta de zaps"
          ></Input>
        ) : (

          <select onChange={({ target }) => pegaValor(target)}>
            <option disabled selected>
              Selecione um deck
            </option>
            {opcoes.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        )}
        <button onClick={definiStap}>{textoBotao}</button>
      </DeckMain>
    </TelaInicio>
  );
}

export default TelaInicial;

const TelaInicio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DeckMain = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  font-size: 36px;
  color: white;
  font-family: "Righteous";
  z-index: 1;
  background-color: var(--cor-fundo);
  select {
    width: 246px;
    height: 43px;
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    padding: 5px;
  }
  button {
    width: 246px;
    height: 54px;
    padding: 16px 22px;
    border-radius: 5px;
    font-family: "Righteous";
    color: #D70900;
    border: 1px;
    font-size: 18px;
    cursor: pointer;
   }
`;

const Input = styled.input`
  width: 246px;
  height: 54px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 5px;
  color: #ff3030;
  &::placeholder {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    padding: 5px;
  }
  &:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`;
