import React from 'react'
import styled from 'styled-components'
import play from '../assets/img/play-outline-icon.svg'
import seta from '../assets/img/setinha.png'
import check from '../assets/img/check.svg'
import help from '../assets/img/help.svg'
import close from '../assets/img/close.svg'


function Flashcard({pergunta, resposta, categoria, index, habilitaBtnResposta, setLembradas, lembradas}) {

  const corVerde =  'var(--cor-zap)'
  const corVermelha = 'var(--cor-nao-lembrei)'
  const corAmarela = 'var(--cor-quase-nao-lembrei)'


  let [statePergunta, setStatePergunta] = React.useState(true);
  let [stateResposta, setStateResposta] = React.useState(false);
  let [styleFlash, setStyleFlash] = React.useState({color: 'black', styleLine: 'none', src: play})

  function respondeu(escolha){

    setLembradas(lembradas + 1);
    setStatePergunta(true);
    setStateResposta(false);
    if(escolha === 'Zap'){
      setStyleFlash({color: 'green', styleLine: 'line-through', src: check})
    }
    if(escolha === 'Quase não lembrei'){
      setStyleFlash({color: 'yellow', styleLine: 'line-through', src: help})
    }
    if(escolha === 'Não lembrei'){
      setStyleFlash({color: 'red', styleLine: 'line-through', src: close})
    }
  }
  
  function mostraPergunta(){
      setStatePergunta(false);
  }

  function mostraResposta(){
      setStateResposta(true);
      habilitaBtnResposta(false);
  }

  return (
    <div>
      {statePergunta? 

        <FlashcardContainer color={styleFlash.color}>

          <NomePergunta styleLine={styleFlash.styleLine} color={styleFlash.color}>Pergunta {index + 1}
          </NomePergunta>

          <Svg onClick={mostraPergunta} color={styleFlash.color} src={styleFlash.src} alt='botao de play pro flashcard'>
          </Svg>

        </FlashcardContainer>
        
      :
      stateResposta ? 
       
      <Resposta>
        {resposta}
        <Action>
          <Button onClick={({target}) => respondeu(target.innerText)} cor={corVermelha}>Não lembrei</Button>
          <Button onClick={({target}) => respondeu(target.innerText)} cor={corAmarela}>Quase não lembrei</Button>
          <Button onClick={({target}) => respondeu(target.innerText)} cor={corVerde}>Zap</Button>
        </Action>
      </Resposta>
      :
       <FlashCardPergunta>
        {pergunta}
        <Setinha  onClick={mostraResposta} src={seta} alt='opcao de ver resposta'></Setinha>
      </FlashCardPergunta> 
    }

      

    </div>
  )
}

export default Flashcard

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
`

const Action = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${props => props.cor};
  color: white;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  &:hover{
    filter: brightness(0.7)
  }
`

const Setinha = styled.img`
  cursor: pointer;
  color: var(--preto);
  width: 23px;
  height: 23px;
  position: absolute;
  bottom: 10px;
  right: 20px
`

const Svg = styled.img`
  width: 23px;
  height: 23px;
  display: ${props => props.display};
  color: ${props => props.color};
`

const NomePergunta = styled.span`
  text-decoration: ${props => props.styleLine}; 
  color: ${props => props.color}
`

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
`

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
  font-family: 'Recursive', cursive;
  color: ${props => props.color};
`