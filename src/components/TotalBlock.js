import React, {Component} from 'react';
import styled from 'styled-components';

const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 470px;
  margin-top: 3rem;
  background: #ebebeb;
  border-radius: .5rem;
`;

const OutputSection = styled.p`
  width: 35%;
  min-width: 180px;
  max-width: 250px;
  display; flex;
  flex-direction: column;
  padding: 1rem;
`;

const OutputResult = styled.span`
  font-size: 1.5rem
`;

export default class TotalBlock extends Component {
  render() {
    return (
      <Total>
        <OutputSection>
          Ежемесячный платеж<br/>
          <OutputResult>₽</OutputResult>
        </OutputSection>
        <OutputSection>
          Необходимый доход<br/>
          <OutputResult>₽</OutputResult>
        </OutputSection>
        <OutputSection>
          Переплата<br/>
          <OutputResult>₽</OutputResult>
        </OutputSection>
        <OutputSection>
          Тело кредита<br/>
          <OutputResult>₽</OutputResult>
        </OutputSection>
      </Total>
    
    )
  }
}