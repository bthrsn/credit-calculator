import React from 'react';
import styled from 'styled-components';

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const SaveButton = styled.button``;

const ClearButton = styled.button``;

const ButtonsBlock = () => {
  return (
    <Buttons>
        <SaveButton>Save</SaveButton>
        <ClearButton>Clear</ClearButton>
    </Buttons>
  )
}

export default ButtonsBlock;