import React, {Component} from 'react';
import styled from 'styled-components';

const RadioButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  width: 40%;
  min-width: 250px;
  max-width: 350px;
  margin-top: 1rem;
  
  label {
    width: 30px;
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
        &:checked {
          background-color: #1790e9;
        }
  }
  
  input {
    display: none;
  }
`;

export default class RadioButtonsBlock extends Component {

  state = {
    name: 'React'
  }
  
  onChangeValue = (e) => {
    console.log(e.target.value);
  }
  
  render() {
    return(
      <RadioButtons
        onChange={this.onChangeValue}>
          <label><input type="radio" value="10%" name="down-payment" />10%</label>
          <label><input type="radio" value="15%" name="down-payment"/>15%</label>
          <label><input type="radio" value="20%" name="down-payment"/>20%</label>
          <label><input type="radio" value="25%" name="down-payment"/>25%</label>
          <label><input type="radio" value="30%" name="down-payment"/>30%</label>
      </RadioButtons>
    )
  }
}
