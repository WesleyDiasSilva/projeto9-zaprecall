import React from "react";
import styled from "styled-components";
import play from "../assets/img/play-outline-icon.svg";
import seta from "../assets/img/setinha.png";
import check from "../assets/img/check.svg";
import help from "../assets/img/help.svg";
import close from "../assets/img/close.svg";
import flashs from "../flashs";

function Flashcard({
  pergunta,
  resposta,
  categoria,
  index,
  habilitaBtnResposta,
  setLembradas,
  lembradas,
  fila,
  setFila,
  zapadas,
  setZapadas,
  verificaMeta,
  valueSelect,
  setNotificacao,
  perguntaHabilitada,
  setPerguntaHabilitada
}) {
  const corVerde = "var(--cor-zap)";
  const corVermelha = "var(--cor-nao-lembrei)";
  const corAmarela = "var(--cor-quase-nao-lembrei)";

  let [button, setButton] = React.useState(false);
  let [statePergunta, setStatePergunta] = React.useState(true);
  let [stateResposta, setStateResposta] = React.useState(false);
  let [styleFlash, setStyleFlash] = React.useState({
    color: "black",
    styleLine: "none",
    src: play,
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

  function verificaSeTerminou() {
    if (
      flashs.filter((f) => f.categoria === valueSelect).length !==
      lembradas + 1
    ) {
    } else {
      verificaMeta();
    }
  }

  function respondeu(escolha) {
    setLembradas(lembradas + 1);
    verificaSeTerminou();
    setStatePergunta(true);
    setStateResposta(false);
    setButton("true");
    if (escolha === "Zap") {
      setZapadas(zapadas + 1);
      setStyleFlash({
        color: "#2FBE34",
        styleLine: "line-through",
        src: check,
      });
      if (fila.length < 4) {
        setFila([...fila, "Zap"]);
      } else {
        setFila([...fila.shift()]);
        setFila([...fila, "Zap"]);
      }
    }

    if (escolha === "Quase não lembrei") {
      setStyleFlash({ color: "#FF922E", styleLine: "line-through", src: help });
      if (fila.length < 4) {
        setFila([...fila, "Help"]);
      } else {
        setFila([...fila.shift()]);
        setFila([...fila, "Help"]);
      }
    }
    if (escolha === "Não lembrei") {
      setStyleFlash({
        color: "#FF3030",
        styleLine: "line-through",
        src: close,
      });
      if (fila.length < 4) {
        setFila([...fila, "Close"]);
      } else {
        setFila([...fila.shift()]);
        setFila([...fila, "Close"]);
      }
    }
  }

  function mostraPergunta() {
    if (!button) {
      if(perguntaHabilitada){
        setPerguntaHabilitada(false)
        setStatePergunta(false);
      }
    } else {
      mensagemErro('Você já respondeu essa questão!','Alert', '0px');
    }
  }

  function mostraResposta() {
    setStateResposta(true);
    habilitaBtnResposta(false);
  }

  return (
    <div>
      {statePergunta ? (
        <FlashcardContainer color={styleFlash.color}>
          <NomePergunta
            styleLine={styleFlash.styleLine}
            color={styleFlash.color}
          >
            Pergunta {index + 1}
          </NomePergunta>

          <Svg
            onClick={mostraPergunta}
            disabled={button}
            color={styleFlash.color}
            src={styleFlash.src}
            alt="botao de play pro flashcard"
          ></Svg>
        </FlashcardContainer>
      ) : stateResposta ? (
        <Resposta>
          {resposta}
          <Action>
            <Button
              onClick={({ target }) => respondeu(target.innerText)}
              texto={"white"}
              cor={corVermelha}
            >
              Não lembrei
            </Button>

            <Button
              onClick={({ target }) => respondeu(target.innerText)}
              texto={"white"}
              cor={corAmarela}
            >
              Quase não lembrei
            </Button>
            <Button
              onClick={({ target }) => respondeu(target.innerText)}
              texto={"white"}
              cor={corVerde}
            >
              Zap
            </Button>
          </Action>
        </Resposta>
      ) : (
        <FlashCardPergunta>
          {pergunta}
          <Setinha
            onClick={mostraResposta}
            src={seta}
            alt="opcao de ver resposta"
          ></Setinha>
        </FlashCardPergunta>
      )}
    </div>
  );
}

export default Flashcard;

const Resposta = styled.div`
  min-height: 130px;
  margin: 10px 0;
  width: 300px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: var(--cor-fundo-card);
  cursor: default;
  padding: 20px 10px;
  position: relative;
`;

const Action = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.cor};
  color: white;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  &:hover {
    filter: brightness(0.7);
  }
`;

const Setinha = styled.img`
  cursor: pointer;
  color: var(--preto);
  width: 23px;
  height: 23px;
  position: absolute;
  bottom: 10px;
  right: 20px;
`;

const Svg = styled.img`
  width: 23px;
  height: 23px;
  display: ${(props) => props.display};
  color: ${(props) => props.color};
`;

const NomePergunta = styled.span`
  text-decoration: ${(props) => props.styleLine};
  color: ${(props) => props.color};
`;

const FlashCardPergunta = styled.div`
  min-height: 130px;
  margin: 10px 0;
  width: 300px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: var(--cor-fundo-card);
  cursor: default;
  padding: 20px 10px;
  position: relative;
`;

const FlashcardContainer = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: black;
  border-radius: 5px;
  margin: 10px 0px;
  padding: 10px 10px;
  cursor: pointer;
  font-family: "Recursive", cursive;
  color: ${(props) => props.color};
`;
