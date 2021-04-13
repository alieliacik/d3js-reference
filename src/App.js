import styled from 'styled-components'
import Bar from './Bar'
import Circle from './Circle'
import Line from './Line'

function App() {
  return (
    <StyledApp>
      <Bar />
      <Circle />
      <Line />
    </StyledApp>
  )
}

export default App

const StyledApp = styled.div`
  padding: 40px;
  height: 700px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`
