import "../src/assets/css/style.css";
import styled, { keyframes } from "styled-components";
import Flashcard from "./components/Flashcard";
import logo from "../src/assets/img/logo.png";
import React from "react";
import TelaInicial from "./components/TelaInicial";
import check from "../src/assets/img/check.svg";
import close from "../src/assets/img/close.svg";
import help from "../src/assets/img/help.svg";
import flashs from "./flashs";

function App() {

  const notify = React.useRef();

  let [renderizarFlashs, setRenderizarFlashs] = React.useState(false);
  let [btnResposta, setBtnResposta] = React.useState(true);
  let [perguntaHabilitada, setPerguntaHabilitada] = React.useState(true);
  let [lembradas, setLembradas] = React.useState(0);
  let [zapadas, setZapadas] = React.useState(0);
  let [metaDeZap, setMetaDeZap] = React.useState(0);
  let [valueSelect, setValueSelect] = React.useState("");
  let [fila, setFila] = React.useState([]);
  let [notificacao, setNotificacao] = React.useState({
    msgErro: 'Mensagem padrão de erro',
    code: 'alert',
    status: false,
    posicao: '-180px'
  })

  React.useEffect(() => {
    if(notify.current){
      window.scrollTo({
        top:notify.current.getBoundingClientRect(),
        behavior: "smooth"
      })
    }
    console.log('nada')
  },[notificacao])

  const filaRenderizada = [];


  function verificaMeta() {
    console.log(zapadas);
    if (zapadas >= metaDeZap - 1) {
      setTimeout(() => {
        alert("Boa garoto");
      }, 500);
    } else {
      setTimeout(() => {
        alert("perdeu");
      }, 500);
    }
  }

  function habilitaBtnResposta() {
    setBtnResposta(false);
  }
  fila.forEach((item) => {
    if (item === "Zap") {
      filaRenderizada.push(<img src={check} alt="Zap" />);
    }
    if (item === "Help") {
      filaRenderizada.push(<img src={help} alt="Quase não lembrei" />);
    }
    if (item === "Close") {
      filaRenderizada.push(<img src={close} alt="Errei" />);
    }
  });

  return (
    <div>
        <Home>
      {notificacao.status && <Notificacao ref={notify} posicao={notificacao.posicao}>{notificacao.msgErro}</Notificacao>}
          {!renderizarFlashs && (
            <TelaInicial
              setNotificacao={setNotificacao}
              valueSelect={valueSelect}
              setMetaDeZap={setMetaDeZap}
              setRenderizarFlashs={setRenderizarFlashs}
              setValueSelect={setValueSelect}
              flashs={flashs}
            ></TelaInicial>
          )}
          {renderizarFlashs ? (
            <ContainerCabecalho>
              <img src={logo} alt="Logo do zaprecall"></img>
              <h1>ZapRecall</h1>
            </ContainerCabecalho>
          ) : (
            ""
          )}
          {flashs
            .filter((f) => f.categoria === valueSelect)
            .map((f, index) =>
              renderizarFlashs ? (
                <Flashcard
                  setNotificacao={setNotificacao}
                  valueSelect={valueSelect}
                  verificaMeta={verificaMeta}
                  setZapadas={setZapadas}
                  zapadas={zapadas}
                  fila={fila}
                  setFila={setFila}
                  lembradas={lembradas}
                  setLembradas={setLembradas}
                  habilitaBtnResposta={habilitaBtnResposta}
                  btnResposta={btnResposta}
                  setBtnResposta={setBtnResposta}
                  perguntaHabilitada={perguntaHabilitada}
                  setPerguntaHabilitada={setPerguntaHabilitada}
                  key={index}
                  pergunta={f.pergunta}
                  resposta={f.resposta}
                  categoria={f.categoria}
                  index={index}
                />
              ) : (
                ""
              )
            )}
        </Home>


      {renderizarFlashs ? (
        <Footer>
          <div>
            <span>{lembradas}</span>
            <span>
              /{flashs.filter((f) => f.categoria === valueSelect).length}{" "}
              CONCLUÍDO
            </span>
          </div>
          <FilaResposta>{filaRenderizada}</FilaResposta>
        </Footer>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

const FilaResposta = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

const ContainerCabecalho = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
`;



const Home = styled.div`
  width: 100%;
  height: 130%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  position: absolute;
  background-color: var(--cor-fundo);
  padding-bottom: 40px;
  margin-top: -40px;
  h1 {
    font-family: "Righteous", cursive;
    font-size: 36px;
    color: white;
  }

  /* &:hover{
  background-color: #cea2a0;
} */
`;

const EntradaNotificao = keyframes`
  
  33%{
    right: -90px;
    opacity: 1;
    transform: initial;
  }

  66%{
    right: -110px;
    opacity: 1;
    transform: initial;
  }
  
  
  100%{
    right: -100px;
    opacity: 1;
    transform: initial;
  }
`

const Notificacao = styled.div`
  width: 250px;
  height: 70px;
  background-color: #ce3030;
  color: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  top: ${props => props.posicao};
  right: -80px;
  border-radius: 8px;
  opacity: 1;
  transform: translateX(20px);
  animation: ${EntradaNotificao} 1s backwards;
  box-sizing: border-box;
  padding: 15px;
  `



const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1;
  width: 100%;
  min-height: 70px;
  padding: 14px 10px;
  font-size: 18px;
  color: black;
  justify-content: center;
  position: fixed;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
