import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  color: rgb(34, 47, 36);
`
const App = (props) => <Title>{props.title}</Title>

export default App