import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

export default class App extends Component {

  render() {
    return (
      <>
        <h1>Ипотечный калькулятор</h1>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Input without validation</Label>
            <Input />
            <FormFeedback>You will not be able to see this</FormFeedback>
            <FormText>Example help text that remains unchanged.</FormText>
          </FormGroup>
      </Form>
      </>
    );
  }
}

