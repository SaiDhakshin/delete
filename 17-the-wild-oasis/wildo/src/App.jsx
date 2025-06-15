import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Button from './ui/Button'
import Input from './ui/Input'

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`

const StyledApp = styled.div`
  padding: 20px;
`

import './App.css'
import Heading from './ui/Heading'
import Row from './ui/Row'

function App() {

  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading type='h1'>Welcome to Wildo</Heading>
            <H1>The Wild Oasis</H1>
            <Heading type='h2'>Check in and Out</Heading>
            <Button variations='primary' size='medium'>Check in</Button>
            <Button variations='secondary' size='small'>Check out</Button>
          </Row>
          <Row type="vertical">
            <div>
              <Heading as='h3'>Form</Heading>
            <form>
              <Input type="number" placeholder="Number of guests"></Input>
              <Input type="number" placeholder="Number of guests"></Input>
            </form>
            </div>
          </Row>
        </Row>
      </StyledApp>
    </>
  )
}

export default App
