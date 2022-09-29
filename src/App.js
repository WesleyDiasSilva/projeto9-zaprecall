import '../src/assets/css/style.css'
import styled from 'styled-components';
import Flashcard from './components/Flashcard';
import logo from '../src/assets/img/logo.png'
import React from 'react';

function App() {

  
  let [btnResposta, setBtnResposta] = React.useState(true)
  let [perguntaHabilitada, setPerguntaHabilitada] = React.useState(true);
  let [lembradas, setLembradas] = React.useState(0);
  let [podeAbrirPergunta, setPodeAbrirPergunta] = React.useState(true);

  

  const flashs = [
    {
      pergunta: 'O que é JSX?',
      resposta:'Uma extensão de linguagem JavaScript',
      categoria: 'react'
    },
    {
      pergunta: 'O React é?',
      resposta:'uma biblioteca JavaScript para construção de interfaces',
      categoria: 'react'
    },
    {
      pergunta: 'Componentes devem iniciar com?',
      resposta:'letra maiúscula',
      categoria: 'react'
    },
    {
      pergunta: 'Podemos colocar __ dentro do JSX?',
      resposta:'expressões',
      categoria: 'react'
    },
    {
      pergunta: 'O ReactDOM nos ajuda __?',
      resposta:'interagindo com a DOM para colocar componentes React na mesma',
      categoria: 'react'
    },
  ]

  function habilitaBtnResposta(){
    setBtnResposta(false)
  }

  

  return (
    <div>
      <Home>
        <ContainerCabecalho>
          <img src={logo} alt='Logo do zaprecall'></img>
          <h1>ZapRecall</h1>
        </ContainerCabecalho>

        {flashs.map((f, index) => <Flashcard 
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
          index={index}/>)}
      </Home>
      <Footer>
      <div>
        <span>{lembradas}</span>
        <span>/{flashs.length} CONCLUÍDO</span>
      </div>
      </Footer>
    </div>
  );
}

export default App;



const ContainerCabecalho = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
`

const Home = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  position: absolute;
  background-color: var(--cor-fundo);
  h1 {
  font-family: "Righteous", cursive;
  font-size: 36px;
  color: white;
  }
  button {
    width: 246px;
    height: 54px;
    padding: 16px 22px;
    border-radius: 5px;
    color: #D70900;
    border: 1px;
    font-size: 18px;
    cursor: pointer;
   }
  /* &:hover{
  background-color: #cea2a0;
} */
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
  position: fixed;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`