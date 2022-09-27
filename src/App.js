import '../src/assets/css/style.css'
import styled from 'styled-components';
import Flashcard from './components/Flashcard';
import logo from '../src/assets/img/logo.png'

function App() {


  const corVerde =  'var(--cor-zap)'
  const corVermelha = 'var(--cor-nao-lembrei)'
  const corAmarela = 'var(--cor-quase-nao-lembrei)'


  return (
    <div>
      <Home>
        <ContainerCabecalho>
          <img src={logo} alt='Logo do zaprecall'></img>
          <h1>ZapRecall</h1>
        </ContainerCabecalho>
      <Flashcard />
      <Flashcard />
      <Flashcard />
      </Home>
      <Footer>
      <Action>
        <Button cor={corVermelha}>Não lembrei</Button>
        <Button cor={corAmarela}>Quase não lembrei</Button>
        <Button cor={corVerde}>Zap</Button>
      </Action>
      <div>
        <span>1</span>
        <span>/4 CONCLUÍDO</span>
      </div>
      </Footer>
    </div>
  );
}

export default App;

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
`

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