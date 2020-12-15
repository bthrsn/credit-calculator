import React, { useState} from 'react';
// import numeral from 'numeral';
// import 'numeral/locales/ru';
import styled from 'styled-components';
import spriteImg from '../assets/sprites.svg';
import RadioButtonsBlock from './RadioButtonsBlock';
import ButtonsBlock from './ButtonsBlock';
import TotalBlock from './TotalBlock';
import validateField from '../services/validateField';
import {Context} from '../services/context';

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

// const Total = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-wrap: wrap;
//   max-width: 450px;
//   margin-top: 1rem;
//   background: #ebebeb;
//   border-radius: .5rem;
//   box-shadow: 0 0 1px 0 rgba(8, 11, 14, .06), 
//     0 6px 6px -1px rgba(8, 11, 1, .1);
// `;

// const OutputSection = styled.p`
//   width: 35%;
//   min-width: 180px;
//   max-width: 250px;
//   display: flex;
//   flex-direction: column;
//   padding: 1rem;
  
//   span {
//     font-size: 25px;
//     font-weight: 500; 
//   }  
// `;


export default function FormBlock() {

// Расчеты
const [purchasePrice, setPurchasePrice] = useState(''),
      [loanTerm, setLoanTerm] = useState(''), 
      [downPayment, setDownPayment] = useState(''),
      [loanApr, setLoanApr] = useState(''),
      // Для корректного получения данных из localStorage, состояние берем также из localStorage
      [monthlyPayment, setMonthlyPayment] = useState(0),
      [requiredIncome, setRequiredIncome] = useState(0),
      [overPayment, setOverPayment] = useState(0),
      [principal, setPrincipal] = useState(0);
      

      
  const setCalculation = async () => {
  
      // В поле можно вводить только цифры
      const validatedPrice = validateField(purchasePrice, setPurchasePrice),
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
    let principal = purchasePrice - downPayment,
  
      // MI = I / 1200, где
      // MI - ежемесячная выплата процентов, I-процентная ставка,
      monthlyInterest = loanApr / 1200,
      
      // Срок кредитования в месяцах
      numberOfPayments = loanTerm * 12,
        
      // P = C * (MI + MI / ((1+ MI)^n - 1)), где
      // P-ежемесячный платеж, C-тело кредита, MI - ежемесячная выплата процентов
      // n-срок кредитования (в месяцах)
      monthlyPayment = Math.round(principal * (monthlyInterest + monthlyInterest / (Math.pow(1 + monthlyInterest, numberOfPayments) - 1))),
        
      // L = P * n - W + A, где L-переплата, P-ежемесячный платеж,
      // n-срок кредитования, W-стоимость недвижимости, A-первоначальный взнос
      overPayment = Math.round(monthlyPayment * numberOfPayments - purchasePrice + downPayment),
      
      // I = 5 * (P / 3), где 
      // I-необходимый доход, P-ежемесячный платеж
      requiredIncome = Math.round(5 * (monthlyPayment / 3));
      
    setMonthlyPayment(monthlyPayment);
    setRequiredIncome(requiredIncome);
    setOverPayment(overPayment);
    setPrincipal(principal);
    
    console.log(monthlyPayment, requiredIncome, overPayment, principal);
    
  }
  
  // Переключение процентов в первоначальном взносе 
  const onChangeValue = (e) => {
  
    console.log(e.target.value);
    const target = e.target.value;
    const downPayment = purchasePrice * target / 100;
    
    setDownPayment(downPayment);
  }
  
  // // Сохранение элементов в localStorage
  // useEffect(() => {localStorage.setItem('purchasePrice', JSON.stringify(purchasePrice))}, [purchasePrice])
  // useEffect(() => {localStorage.setItem('loanTerm', JSON.stringify(loanTerm))}, [loanTerm])
  // useEffect(() => {localStorage.setItem('downPayment', JSON.stringify(downPayment))}, [downPayment])
  // useEffect(() => {localStorage.setItem('loanApr', JSON.stringify(loanApr))}, [loanApr])

  // useEffect(() => {localStorage.setItem('monthlyPayment', JSON.stringify(monthlyPayment))}, [monthlyPayment])
  // useEffect(() => {localStorage.setItem('requiredIncome', JSON.stringify(requiredIncome))}, [requiredIncome])
  // useEffect(() => {localStorage.setItem('overPayment', JSON.stringify(overPayment))}, [overPayment])
  // useEffect(() => {localStorage.setItem('principal', JSON.stringify(principal))}, [principal])

  // Отображение на странице
  return(
  <Context.Provider value={{
    onChangeValue,
    monthlyPayment,
    requiredIncome,
    overPayment,
    principal,
  }}>
    <Container>
      <h1>Ипотечный калькулятор</h1>
      <form>
        <InputSection>
          <label>Стоимость недвижимости</label>
          <ErrorBlock>{purchasePrice.error}</ErrorBlock>
          <input 
            onChange={(e) => setPurchasePrice(e.target.value)}
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
          <RadioButtonsBlock>
          </RadioButtonsBlock>
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
        // requiredIncome = {requiredIncome}
        // monthlyPayment = {monthlyPayment}
        // overPayment = {overPayment}
        // principal = {principal}
      />
      {/* <Total>
        <OutputSection>
          Ежемесячный платеж
          <span>{(monthlyPayment).toLocaleString('ru')} ₽</span>
        </OutputSection>
        <OutputSection>
          Необходимый доход
          <span>{(requiredIncome).toLocaleString('ru')} ₽</span>
        </OutputSection>
        <OutputSection>
          Переплата
          <span>{(overPayment).toLocaleString('ru')} ₽</span>
        </OutputSection>
        <OutputSection>
          Тело кредита
          <span>{(principal).toLocaleString('ru')} ₽</span>
        </OutputSection>
      </Total> */}
    </Container>
    </Context.Provider>
  )
}

  
