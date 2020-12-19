import React, { useState, useEffect } from 'react';
import numeral from 'numeral';
import 'numeral/locales/ru';
import validateField from '../services/validateField';
import {addSpacesToValue, removeSpacesInValue} from '../services/displayNumerals';
import {Context} from '../services/context';

import RadioButtonsBlock from './RadioButtonsBlock';
import ButtonsBlock from './ButtonsBlock';
import TotalBlock from './TotalBlock';

import styled from 'styled-components';
import spriteImg from '../assets/sprites.svg';

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

  // Используем хук useState для хранения и изменения state
  const [purchasePrice, setPurchasePrice] = useState(''),
        [loanTerm, setLoanTerm] = useState(''), 
        [downPayment, setDownPayment] = useState(''),
        [loanApr, setLoanApr] = useState(''),
        [monthlyPayment, setMonthlyPayment] = useState(0),
        [requiredIncome, setRequiredIncome] = useState(0),
        [overPayment, setOverPayment] = useState(0),
        [principal, setPrincipal] = useState(0);
        // // state для чекбоксов
        // [checked, setChecked] = useState(false)
      
   
   // Переключение значения в первоначальном взносе  по клику на radio button
  useEffect(() => {calculateValues()}, [downPayment]);
  const onChangeValue = (e) => {
    // Убираем знак процента
    const value = (e.target.value).replace(/\D/g, ''),
          downPayment = Math.round(purchasePrice * value / 100);
          
    setDownPayment(downPayment);
  }
  
  // // При вводе вручную якорь убирается
  // useEffect(() => {removeChecked()}, [checked]);
  
  // const removeChecked = () => {
  //   setChecked(false);
  // }

  // Функция для запуска расчетов после валидации
  const setCalculation = () => {
  
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
        
      // L = P * n - C, где L-переплата, P-ежемесячный платеж,
      // n-срок кредитования, C-тело кредита
      overPayment = Math.round(monthlyPayment * numberOfPayments - principal),
      
      // I = 5 * (P / 3), где 
      // I-необходимый доход, P-ежемесячный платеж
      requiredIncome = Math.round(5 * (monthlyPayment / 3));
      
    setMonthlyPayment(monthlyPayment)
    setRequiredIncome(requiredIncome)
    setOverPayment(overPayment)
    setPrincipal(principal)    
  }
  
  // Сохранение ввода и расчетов в localStorage
  
  // Очистка input
  const clearInput = (e) => {
    e.preventDefault();
    console.log('Clear');
    
    // setPurchasePrice(0);
    // setLoanTerm(0);
    // setDownPayment(0);
    // setLoanApr(0);
  }
  
  // Сохранение в localStorage
  const saveInput = (e) => {
    e.preventDefault();
    console.log('Save');

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
  
  // Переключение локали отображения чисел на русский язык
  numeral.locale('ru');

  // Отображение на странице
  return(
  <Context.Provider value={{
      // checked,
      // setChecked,
      clearInput,
      saveInput,
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
              onChange={(e) => {
                const {value} = e.target;
                e.target.value = addSpacesToValue(value);
                setPurchasePrice(removeSpacesInValue(value));
                }
              }
              onKeyUp={() => setCalculation()}
              style={{backgroundPosition: 'left 150% top 95%'}}
              type='text'/>
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
              onChange={(e) => {
                const {value} = e.target;
                setDownPayment(removeSpacesInValue(value));
                e.target.value = addSpacesToValue(value);
                }
              }
              value={addSpacesToValue(downPayment)}
              // onKeyUp={() => setCalculation()}
              // onInput={() => removeChecked()}
              style={{backgroundPosition: 'left 150% top 95%'}}
              type='text' />
            <RadioButtonsBlock />
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
        <TotalBlock />
      </Container>
    </Context.Provider>
  )
}

export default FormBlock;
  
