import React from 'react';
import numeral from 'numeral';
import styled from 'styled-components';

const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 450px;
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
         
    return (
      <Total>
        <OutputSection>
          Ежемесячный платеж
          <span>{numeral(this.props.monthlyPayment).format('0,0')} ₽</span>
        </OutputSection>
        <OutputSection>
          Необходимый доход
          <span>{numeral(this.props.requiredIncome).format('0,0')} ₽</span>
        </OutputSection>
        <OutputSection>
          Переплата
          <span>{numeral(this.props.overPayment).format('0,0')} ₽</span>
        </OutputSection>
        <OutputSection>
          Тело кредита
          <span>{numeral(this.props.principal).format('0,0')} ₽</span>
        </OutputSection>
      </Total>
    
    )
}

export default TotalBlock;