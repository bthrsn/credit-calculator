import React, {Component} from 'react';
import styled from 'styled-components';

const RadioButton = styled.label`
  display: inline;
  margin: 5px;
  padding: 2px;
  background-color:#d7d7d7;
  border-radius: .2rem;
`;

const RadioInput = styled.input`
  display: none;
  
  :checked+label {
    background-color: #1790e9;
  }
`;

export default class RadioButtons extends Component {

  state = {
    name: 'React'
  }
  
  onChangeValue = (e) => {
    console.log(e.target.value);
  }
  
  render() {
    return(
      <div
        onChange={this.onChangeValue}>
          <RadioButton><RadioInput type="radio" value="10%" name="down-payment" />10%</RadioButton>
          <RadioButton><RadioInput type="radio" value="20%" name="down-payment"/>20%</RadioButton>
          <RadioButton><RadioInput type="radio" value="25%" name="down-payment"/>25%</RadioButton>
          <RadioButton><RadioInput type="radio" value="30%" name="down-payment"/>30%</RadioButton>
          <RadioButton><RadioInput type="radio" value="15%" name="down-payment"/>15%</RadioButton>
      </div>
    )
  }
}
