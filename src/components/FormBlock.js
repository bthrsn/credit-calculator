import React, { useState } from 'react';
import styled from 'styled-components';
// import numeral from 'numeral';
import spriteImg from '../assets/sprites.svg';
import RadioButtonsBlock from './RadioButtonsBlock';
import TotalBlock from './TotalBlock';
import ButtonsBlock from './ButtonsBlock';
import validateField from '../services/validateField';

// Стили
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem 0;
  max-width: 800px;
  margin: auto;
  
    h1 {
      text-align: center;
      margin: 0 auto;
      font-size: 35px;
      font-weight: 500;
      color: #fffff;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    
    form {
      display: flex;
      justify-content: center;
      align-items: top;
      flex-wrap: wrap;
      margin-top: 1rem;
    }
    
`;

const InputSection = styled.div`
  width: 35%;
  min-width: 250px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  margin-left: 50px;
  padding-bottom: 1rem;
  
    label {
      margin-bottom: .5rem;
    }
    
    input {
      height: 25px;
      background-image: url(${spriteImg});
      background-repeat: no-repeat;
      border: none;
      border-radius: .2rem;
      box-shadow: 0 0 1px 0 rgba(8, 11, 14, .06), 
      0 6px 6px -1px rgba(8, 11, 1, .1);
      transition: all .3s ease-in-out;
        &:hover,
        &:focus {
          box-shadow: 0 0 1px 0 rgba(8, 11, 14, .06), 
          0 16px 16px -1px rgba(8, 11, 1, .1);    
        }
    }
`;

const ErrorBlock = styled.span`
  margin-bottom: .2rem;
  font-weight: 500;
  color: red;
`;


const FormBlock = () => {

// Расчеты
const [purchasePrise, setPurchasePrise] = useState(''),
      [loanTerm, setLoanTerm] = useState(''), 
      [downPayment, setDownPayment] = useState(''),
      [loanApr, setLoanApr] = useState(''),
      [setRequiredIncome] = useState(0),
      [setMonthlyPayment] = useState(0),
      [setOverPayment] = useState(0),
      [setPrincipal] = useState(0);
      
// requiredIncome, 
// monthlyPayment, 
// overPayment, 
// principal, 
      
const setCalculation = () => {

    // В поле можно вводить только цифры
    const validatedPrice = validateField(purchasePrise, setPurchasePrise),
         validatedPayment = validateField(loanTerm, setLoanTerm),
         validatedLoanTerm = validateField(downPayment, setDownPayment),
         validatedLoanApr = validateField(loanApr, setLoanApr);
     
    //  Условия расчета
    if (validatedPrice &&
      validatedPayment &&
      validatedLoanTerm &&
      validatedLoanApr) {
        calculateValues();
      }
}

const calculateValues = () => {

    // C = W - A, где
    // C-тело кредита, W-стоимость недвижимости, A-первоначальный взнос 
  let principal = purchasePrise - downPayment,
  
      // MI = I / 1200, где
      // MI - ежемесячная выплата процентов, I-процентная ставка,
      monthlyInterest = loanApr / 1200,
      numberOfPayments = loanTerm * 12,
      
      // P = C * (MI + MI / ((1+ MI)^n - 1)), где
      // P-ежемесячный платеж, C-тело кредита, MI - ежемесячная выплата процентов
      // n-срок кредитования (в месяцах)
      monthlyPayment = Math.round(principal * (monthlyInterest + monthlyInterest / (Math.pow(1 + monthlyInterest, numberOfPayments) - 1))),
      
      // I = 5 * (P / 3), где 
      // I-необходимый доход, P-ежемесячный платеж
      overPayment = monthlyPayment * numberOfPayments - purchasePrise + downPayment,
      
      // L = P * n - W + A, где L-переплата, P-ежемесячный платеж,
      // n-срок кредитования, W-стоимость недвижимости, A-первоначальный взнос
      requiredIncome = Math.round(5 * (monthlyPayment / 3));
      
    setMonthlyPayment(monthlyPayment);
    setRequiredIncome(requiredIncome);
    setOverPayment(overPayment);
    setPrincipal(principal);
    
    
      
          
  console.log(monthlyPayment, overPayment, requiredIncome, principal);
}

  // Отображение на странице
  return(
    <Container>
      <h1>Ипотечный калькулятор</h1>
      <form>
        <InputSection>
          <label>Стоимость недвижимости</label>
          <ErrorBlock>{purchasePrise.error}</ErrorBlock>
          <input 
            onChange={(e) => setPurchasePrise(e.target.value)}
            onKeyUp={() => setCalculation()}
            style={{backgroundPosition: 'left 150% top 95%'}}
            type='text' />
        </InputSection>
        <InputSection>
          <label>Срок кредита</label>
          <ErrorBlock>{loanTerm.error}</ErrorBlock>
          <input 
            onChange={(e) => setLoanTerm(e.target.value)}
            onKeyUp={() => setCalculation()}
            style={{backgroundPosition: 'left 120% top 5%'}}
            type='text'/>
        </InputSection>
        <InputSection>
          <label>
            Первоначальный взнос
          </label>
          <ErrorBlock>{downPayment.error}</ErrorBlock>
          <input
            onChange={(e) => setDownPayment(e.target.value)}
            onKeyUp={() => setCalculation()}
            style={{backgroundPosition: 'left 150% top 95%'}}
            type='text' />
          <RadioButtonsBlock></RadioButtonsBlock>
        </InputSection>
        <InputSection>
          <label>Процентная ставка</label>
          <ErrorBlock>{loanApr.error}</ErrorBlock>
          <input 
            onChange={(e) => setLoanApr(e.target.value)}
            onKeyUp={() => setCalculation()}
            style={{backgroundPosition: 'left 150% top 50%'}}
            type='text' />
        </InputSection>
      </form>
      <ButtonsBlock />
      <TotalBlock 
        monthlyPayment = {this.state.monthlyPayment}
        setMonthlyPayment = {this.state.setMonthlyPayment}
        requiredIncome = {this.state.requiredIncome}
        setRequiredIncome = {this.state.setRequiredIncome}
        overPayment = {this.state.overPayment}
        setOverPayment = {this.state.setOverPayment}
        principal = {this.state.principal}
        setPrincipal = {this.state.setPrincipal}/>
    </Container>
  )
}

export default FormBlock;
  
