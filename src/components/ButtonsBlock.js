import React, {useContext} from 'react';
import {Context} from '../services/context';

import styled from 'styled-components';

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 37%;
  min-width: 250px;
  max-width: 350px;
  
    button {
      min-width: 100px;
      height: 30px;
      border: none;
      border-radius: .2rem;
      box-shadow: 0 0 1px 0 rgba(8, 11, 14, .06), 
      0 6px 6px -1px rgba(8, 11, 1, .1);
      cursor: pointer;
      transition: all .3s ease-in-out;
        &:hover {
          box-shadow: 0 0 1px 0 rgba(8, 11, 14, .06), 
          0 16px 16px -1px rgba(8, 11, 1, .1);    
        }
`;

const SaveButton = styled.button`
  background-color: #4cb032;
  color: #fff;
`;

const ClearButton = styled.button`
  background-color: #f7f7f7;
  color: #000;
`;

const ButtonsBlock = () => {

  const {clearData, saveData} = useContext(Context);
    
  return (
    <Buttons>
        <SaveButton
          onClick={(e) => saveData(e)}
          >
            Save
          </SaveButton>
        <ClearButton
          onClick={(e) => clearData(e)}
          >
            Clear
        </ClearButton>
    </Buttons>
  )
}

export default ButtonsBlock;