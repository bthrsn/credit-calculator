import React, {useState} from 'react';
import styled from 'styled-components';

const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 470px;
  margin-top: 1rem;
  background: #ebebeb;
  border-radius: .5rem;
  box-shadow: 0 0 1px 0 rgba(8, 11, 14, .06), 
    0 6px 6px -1px rgba(8, 11, 1, .1);
`;

const OutputSection = styled.p`
  width: 35%;
  min-width: 180px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  
  span {
    font-size: 25px;
    font-weight: 500; 
  }  
`;

const TotalBlock = () => {

    const [monthlyPayment, setMonthlyPayment] = useState(''),
          [requiredIncome, setRequiredIncome] = useState(''),
          [overPayment, setOverPayment] = useState(''),
          [principal, setPrincipal] = useState('');
          
    return (
      <Total>
        <OutputSection>
          Ежемесячный платеж
          <span>{monthlyPayment} ₽</span>
        </OutputSection>
        <OutputSection>
          Необходимый доход
          <span>{requiredIncome} ₽</span>
        </OutputSection>
        <OutputSection>
          Переплата
          <span>{overPayment} ₽</span>
        </OutputSection>
        <OutputSection>
          Тело кредита
          <span>{principal} ₽</span>
        </OutputSection>
      </Total>
    
    )
}

export default TotalBlock;