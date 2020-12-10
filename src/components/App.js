import React from 'react';
import styled from 'styled-components';
import backgroundImg from '../assets/background.jpg';
import FormBlock from './FormBlock';

const Container = styled.div`
  background: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  padding: 2rem 0;
  height: 100vh;
  width: 100vw;
`;

const App = () => {
  return (
    <Container>
      <FormBlock />
    </Container>
  );
}

export default App;

