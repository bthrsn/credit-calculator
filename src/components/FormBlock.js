import React, { useState, useEffect } from "react";
import numeral from "numeral";
import "numeral/locales/ru";
import {
  formatValueToString,
  formatValueToNumber,
} from "../services/displayNumerals";
import { Context } from "../services/context";

import RadioButtonsBlock from "./RadioButtonsBlock";
import ButtonsBlock from "./ButtonsBlock";
import TotalBlock from "./TotalBlock";

import styled from "styled-components";

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
    margin-bottom: 0.5rem;
  }

  input {
    height: 25px;
    border: none;
    border-radius: 0.2rem;
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
      0 6px 6px -1px rgba(8, 11, 1, 0.1);
    transition: all 0.3s ease-in-out;
    &:hover,
    &:focus {
      box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
        0 16px 16px -1px rgba(8, 11, 1, 0.1);
    }
  }
`;

const FormBlock = () => {
  const [purchasePrice, setPurchasePrice] = useState(""),
    [loanTerm, setLoanTerm] = useState(""),
    [downPayment, setDownPayment] = useState(""),
    [loanApr, setLoanApr] = useState(""),
    [monthlyPayment, setMonthlyPayment] = useState(0),
    [requiredIncome, setRequiredIncome] = useState(0),
    [overPayment, setOverPayment] = useState(0),
    [principal, setPrincipal] = useState(0);

  useEffect(() => {
    setCalculation();
  }, [downPayment]);
  const onChangeValue = (e) => {
    const value = e.target.value.replace(/\D/g, ""),
      downPayment = Math.round((purchasePrice * value) / 100);

    setDownPayment(downPayment);
  };

  const setCalculation = () => {
    let principal = purchasePrice - downPayment,
      monthlyInterest = loanApr / 1200,
      numberOfPayments = loanTerm * 12,
      monthlyPayment = Math.round(
        principal *
          (monthlyInterest +
            monthlyInterest /
              (Math.pow(1 + monthlyInterest, numberOfPayments) - 1))
      ),
      overPayment = Math.round(monthlyPayment * numberOfPayments - principal),
      requiredIncome = Math.round(5 * (monthlyPayment / 3));

    setMonthlyPayment(monthlyPayment);
    setRequiredIncome(requiredIncome);
    setOverPayment(overPayment);
    setPrincipal(principal);
  };

  const clearInput = (e) => {
    e.preventDefault();

    setPurchasePrice("");
    setLoanTerm("");
    setDownPayment("");
    setLoanApr("");

    localStorage.clear();
  };

  const saveInput = (e) => {
    e.preventDefault();

    localStorage.setItem("purchasePrice", JSON.stringify(purchasePrice));
    localStorage.setItem("loanTerm", JSON.stringify(loanTerm));
    localStorage.setItem("downPayment", JSON.stringify(downPayment));
    localStorage.setItem("loanApr", JSON.stringify(loanApr));
  };

  useEffect(() => {
    setPurchasePrice(JSON.parse(localStorage.getItem("purchasePrice")));
  }, []);
  useEffect(() => {
    setLoanTerm(JSON.parse(localStorage.getItem("loanTerm")));
  }, []);
  useEffect(() => {
    setDownPayment(JSON.parse(localStorage.getItem("downPayment")));
  }, []);
  useEffect(() => {
    setLoanApr(JSON.parse(localStorage.getItem("loanApr")));
  }, []);

  const handleChange = (e, suffix, setState) => {
    const { value } = e.target;
    e.target.value = formatValueToString(value, suffix);
    setState(formatValueToNumber(value));
    e.target.selectionEnd = e.target.selectionStart =
      e.target.value.length - suffix.length;
  };

  numeral.locale("ru");

  return (
    <Context.Provider
      value={{
        clearInput,
        saveInput,
        onChangeValue,
        monthlyPayment,
        requiredIncome,
        overPayment,
        principal,
      }}
    >
      <Container>
        <h1>Loan Calculator</h1>
        <form>
          <InputSection>
            <label>Purchase Price</label>
            <input
              onChange={(e) => handleChange(e, " €", setPurchasePrice)}
              onKeyUp={() => setCalculation()}
              type="text"
              value={formatValueToString(purchasePrice, " €")}
            />
          </InputSection>
          <InputSection>
            <label>Loan Term</label>
            <input
              onChange={(e) => handleChange(e, loanTerm > 1 ? " years" : " year", setLoanTerm)}
              onKeyUp={() => setCalculation()}
              type="text"
              value={formatValueToString(
                loanTerm,
                loanTerm > 1 ? " years" : " year"
              )}
            />
          </InputSection>
          <InputSection>
            <label>Downpayment</label>
            <input
              onChange={(e) => handleChange(e, " €", setDownPayment)}
              type="text"
              value={formatValueToString(downPayment, " €")}
            />
            <RadioButtonsBlock />
          </InputSection>
          <InputSection>
            <label>Interest Rate</label>
            <input
              onChange={(e) => handleChange(e, "%", setLoanApr)}
              onKeyUp={() => setCalculation()}
              type="text"
              value={formatValueToString(loanApr, "%")}
            />
          </InputSection>
        </form>
        <ButtonsBlock />
        <TotalBlock />
      </Container>
    </Context.Provider>
  );
};

export default FormBlock;
