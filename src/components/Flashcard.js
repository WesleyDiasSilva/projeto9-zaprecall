import React from 'react'
import styled from 'styled-components'
import play from '../assets/img/play-outline-icon.svg'
import seta from '../assets/img/setinha.png'


function Flashcard({pergunta, resposta, categoria, index, perguntaHabilitada, setPerguntaHabilitada, habilitaBtnResposta, setPodeAbrirPergunta, podeAbrirPergunta}) {


  
  let [statePergunta, setStatePergunta] = React.useState(true);
  let [stateResposta, setStateResposta] = React.useState(false);
  
  React.useEffect(() => {
    setStatePergunta(true)
    setStateResposta(false)
  },[podeAbrirPergunta])

  function trocaPergunta(){
    if(perguntaHabilitada){
      setStatePergunta(false);
      setPerguntaHabilitada(false)
    }
 
  }

  function trocaResposta(){
      setStateResposta(true)
      habilitaBtnResposta(false)
  }

  return (
    <div>
      {statePergunta? 

        <FlashcardContainer>

          <NomePergunta >Pergunta {index + 1}
          </NomePergunta>

          <Svg onClick={trocaPergunta} src={play} alt='botao de play pro flashcard'>
          </Svg>

        </FlashcardContainer>
        
      :

        <FlashCardPergunta> 
          {stateResposta ? resposta : pergunta}
          {stateResposta ? '' 
           : <Setinha  onClick={trocaResposta} src={seta} alt='opcao de ver resposta'></Setinha>
          }
           
        </FlashCardPergunta>
    }

    </div>
  )
}

export default Flashcard

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
`

const NomePergunta = styled.span`
  display: ${props => props.display};
  
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
`