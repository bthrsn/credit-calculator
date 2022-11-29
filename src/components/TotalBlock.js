import React, {useContext} from 'react';
import numeral from 'numeral';
import 'numeral/locales/ru';
import styled from 'styled-components';
import {Context} from '../services/context';

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
    const {monthlyPayment, requiredIncome, overPayment, principal} = useContext(Context);
    numeral.locale('ru');

    return (
      <Total>
        <OutputSection>
          Monthly Payment
          <span>{numeral(monthlyPayment).format('0,0')} €</span>
        </OutputSection>
        <OutputSection>
          Required Income
          <span>{numeral(requiredIncome).format('0,0')} €</span>
        </OutputSection>
        <OutputSection>
          Overpayment
          <span>{numeral(overPayment).format('0,0')} €</span>
        </OutputSection>
        <OutputSection>
          Loan Amount
          <span>{numeral(principal).format('0,0')} €</span>
        </OutputSection>
      </Total>

    )
}

export default TotalBlock;