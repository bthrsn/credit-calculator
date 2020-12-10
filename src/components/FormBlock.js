import React from 'react';
import styled from 'styled-components';
import RadioButtons from './RadioButtons';
import TotalBlock from './TotalBlock';
import ButtonsBlock from './ButtonsBlock';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem 0;
  max-width: 900px;
  margin: auto;
  
    h1 {
      font-size: 35px;
      font-weight: 500;
      color: #fffff;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    
    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 1rem;
    }
`;

const InputSection = styled.div`
  width: 45%;
  min-width: 350px;
  max-width: 450px;
  display; flex;
  flex-direction: column;
  padding: 1rem;
`;


const FormBlock = () => {

  return(
    <Container>
      <h1>Ипотечный калькулятор</h1>
      <form>
        <InputSection>
          <label>Стоимость недвижимости</label><br/>
          <input type='text' />
        </InputSection>
        <InputSection>
          <label>Первоначальный взнос</label><br/>
          <input type='text' />
          <RadioButtons></RadioButtons>
        </InputSection>
        <InputSection>
          <label>Срок кредита</label><br/>
          <input type='text' />
        </InputSection>
        <InputSection>
          <label>Процентная ставка</label><br/>
          <input type='text' />
        </InputSection>
        <ButtonsBlock />
      </form>
      <TotalBlock />
    </Container>
  )
}

export default FormBlock;
  
