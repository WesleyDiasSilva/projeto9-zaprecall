import React from 'react'
import styled from 'styled-components'
import play from '../assets/img/play-outline-icon.svg'

function Flashcard() {
  return (
    <div>
      <FlashcardContainer>
        <span>Pergunta 1</span>
        <Svg src={play} alt='botao de play pro flashcard'></Svg>
      </FlashcardContainer>
    </div>
  )
}

export default Flashcard

const Svg = styled.img`
  width: 23px;
  height: 23px;
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