import React from "react";
import styled, { keyframes } from "styled-components";
import logo from "../assets/img/logo.png";

function TelaInicial({
  flashs,
  setRenderizarFlashs,
  setValueSelect,
  setMetaDeZap,
  valueSelect,
  setNotificacao,
}) {
  let [textoBotao, setTextoBotao] = React.useState("Iniciar Recall");
  let [deckOk, setDeckOk] = React.useState(false);
  let [iniciou, setIniciou] = React.useState(false);
  let [valorInput, setValorInput] = React.useState("");

  const opcoes = [];
  flashs.forEach((f) => {
    if (!opcoes.includes(f.categoria)) {
      opcoes.push(f.categoria);
    }
  });

  function mensagemErro(msg, code, posicao, tempo=3000) {
    setNotificacao({
      msgErro: msg,
      code: code,
      status: true,
      posicao: posicao
    });

    setTimeout(() => {
      setNotificacao({
        msgErro: "mensagem padrão",
        code: "code padrão",
        status: false,
        posicao: posicao
      });
    }, tempo);
  }

  function definiStap() {
    if (!iniciou) {
      setIniciou(true);
      return;
    }
    if (deckOk) {

      if (Number.isInteger(valorInput) || valorInput === 0) {
        if (
          valorInput <= flashs.filter((f) => f.categoria === valueSelect).length
        ) {
          setMetaDeZap(valorInput);
          renderizarFlashs();
        } else {
          mensagemErro("Meta maior que o número de cartas no deck!", "Error", '-180px');
          setValorInput("");
        }
      } else {
        mensagemErro(
          "Por favor, preencha um número como meta de Zap!",
          "Alert",
          "-180px"
        );
        return;
      }
    } else {
      escolheDeck();
    }
  }

  function escolheDeck() {
    if (valueSelect) {
      setTextoBotao("Iniciar Recall");
      setDeckOk(true);
    } else {
      mensagemErro("Escolha um Deck por favor!", "Error", "-180px");
    }
  }

  function renderizarFlashs() {
    setRenderizarFlashs(true);
  }

  function pegaValor(e) {
    setValueSelect(e.value);
  }

  function atualizaValorInput(value) {
    if(value === '' || value === undefined){
      setValorInput(Number(value))
      return;
    }
    if (Number(value) || Number(value) === 0){
      if(Number(value) > 0){
        setValorInput(Number(value));
      }else{
        mensagemErro(
          "A meta de zaps deve ser maior que 0.",
          "Error",
          "-180px"
        );
      }
    } else {
      mensagemErro(
        "Por favor, preencha apenas números como meta de Zap!",
        "Error",
        "-180px"
      );
    }
  }

  return (
    <TelaInicio>
      <img src={logo} alt="logo" />
      <DeckMain>
        <span>ZapRecall</span>
        {deckOk ? (
          <Input
            onChange={({ target }) => atualizaValorInput(target.value)}
            value={valorInput}
            placeholder="Qual sua meta de zaps?"
          ></Input>
        ) : iniciou ? (
          <select onChange={({ target }) => pegaValor(target)}>
            <option disabled selected>
              Selecione um deck
            </option>
            {opcoes.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          ""
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
    color: #d70900;
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
