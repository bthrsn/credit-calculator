import React, {useState} from 'react';
import styled from 'styled-components';
import RadioButtonsBlock from './RadioButtonsBlock';
import TotalBlock from './TotalBlock';
import ButtonsBlock from './ButtonsBlock';
import validateField from '../services/validateField';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem 0;
  max-width: 800px;
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
  padding-bottom: 1rem;
  
    label {
      margin-bottom: .5rem;
    }
    
    input {
      margin-right: 30px;
      height: 25px;
      border: none;
      outline: none;
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
  margin: 1rem;
  font-weight: 500;
  color: red;
`;



const FormBlock = () => {
const [purchasePrise, setPurchasePrise] = useState(''),
      [loanTerm, setLoanTerm] = useState(''), 
      [downPayment, setDownPayment] = useState(''),
      [loanApr, setLoanApr] = useState(''); 
      
const setCalculation = async (e) => {
    e.preventDefault()
    
    // В поле можно вводить только цифры
    const validatedPrice = await validateField(purchasePrise, setPurchasePrise),
     validatedPayment = await validateField(loanTerm, setLoanTerm),
     validatedLoanTerm = await validateField(downPayment, setDownPayment),
     validatedLoanApr = await validateField(loanApr, setLoanApr);
     
    //  Условия расчета
    if (validatedPrice &&
      validatedPayment &&
      validatedLoanTerm &&
      validatedLoanApr) {
        console.log('Все значения введены правильно');
        calculateValues();
      }
}

const calculateValues = () => {
  const principal = purchasePrise - downPayment;
  console.log(principal);
}


      
  return(
    <Container>
      <h1>Ипотечный калькулятор</h1>
      <form>
        <InputSection>
          <label>Стоимость недвижимости</label>
          <ErrorBlock>{purchasePrise.error}</ErrorBlock>
          <input 
            onChange={(e) => {
              setPurchasePrise(e.target.value)
              setCalculation(e)}}
            type='text' />
        </InputSection>
        <InputSection>
          <label>Срок кредита</label>
          <ErrorBlock>{loanTerm.error}</ErrorBlock>
          <input 
            onChange={(e) => {
              setLoanTerm(e.target.value)
              setCalculation(e)}}
            type='text' />
        </InputSection>
        <InputSection>
          <label>
            Первоначальный взнос
          </label>
          <ErrorBlock>{downPayment.error}</ErrorBlock>
          <input
            onChange={(e) => {
              setDownPayment(e.target.value)
              setCalculation(e)}}
            type='text' />
          <RadioButtonsBlock></RadioButtonsBlock>
        </InputSection>
        <InputSection>
          <label>Процентная ставка</label>
          <ErrorBlock>{loanApr.error}</ErrorBlock>
          <input 
            onChange={(e) => {
              setLoanApr(e.target.value)
              setCalculation(e)}}
            type='text' />
        </InputSection>
      </form>
      <ButtonsBlock />
      <TotalBlock />
    </Container>
  )
}

export default FormBlock;
  