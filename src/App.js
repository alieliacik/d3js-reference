import styled from 'styled-components'
import Circle from './Circle'
import Line from './Line'

function App() {
  return (
    <StyledApp>
      {/* <Circle /> */}
      <Line />
    </StyledApp>
  )
}

export default App

const StyledApp = styled.div`
  padding: 20px;
  height: 700px;
  background-color: #eee;
  display: flex;
  justify-content: center;
`
