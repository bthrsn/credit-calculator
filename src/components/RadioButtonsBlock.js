import React from 'react';
import styled from 'styled-components';

const RadioButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  min-width: 250px;
  max-width: 350px;
  margin-top: 1rem;
  
  span {
    min-width: 30px;
    padding: 3px;
    background-color: #d7d7d7;
    border-radius: .2rem;
    cursor: pointer;
    transition: all .3s ease-in-out;
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, .06), 
      0 6px 6px -1px rgba(8, 11, 1, .1);
        &:hover {
          box-shadow: 0 0 1px 0 rgba(8, 11, 14, .06), 
          0 16px 16px -1px rgba(8, 11, 1, .1);    
        }
  }
  
  input {
    display: none;
    &:checked + span {
      background-color: #1790e9;
    }
  }
`;

 const RadioButtonsBlock  = (purchasePrice) => {
  
  const onChangeValue = (e) => {
  
    // console.log(e.target.value);
    const target = e.target.value;
    const downPayment = purchasePrice * target / 100;
    
    return downPayment
  }
  
  return(
    <RadioButtons
      onChange={onChangeValue}>
        <label>
          <input type="radio" value="10%" name="down-payment" />
          <span>10%</span>
        </label>
        <label>
          <input type="radio" value="15%" name="down-payment"/>
          <span>15%</span></label>
        <label>
          <input type="radio" value="20%" name="down-payment"/>
          <span>20%</span></label>
        <label>
          <input type="radio" value="25%" name="down-payment"/>
          <span>25%</span>
        </label>
        <label>
          <input type="radio" value="30%" name="down-payment"/>
          <span>30%</span>
        </label>
    </RadioButtons>
  )
}

export default RadioButtonsBlock;
