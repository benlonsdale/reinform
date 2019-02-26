# Reinform &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/reinform.svg?style=flat)](https://www.npmjs.com/package/reinform) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Reinform is a small collection of [react hooks](https://reactjs.org/docs/hooks-intro.html) that give you a level of control and flexibility previously unavailable with conventional react forms.

Reinform hooks are built with accessibility in mind and will by default set aria-labels for you. This is something that needs to be expanded on but its there as a start.

Inspiration for these hooks came originally from a comment made by Dan Abramov in the react hooks announcement demo. The more I expanded upon the idea the more powerful I found the idea to be.

## Installation
```
npm install reinform
```

## Basic usage
```jsx
import React, { Fragment } from 'react';
import { useForm, useInput } from 'reinform';

const App = () => {
    const form = useForm(); // initialise your form instance
    // for each input you pass a config object and the reference to the form 
    const nameInput = useInput({
        name: 'name',
        displayName: 'Your name',
        validation: {
            required: true,
            minLength: 10,
        }
    }, form) 

    const handleSubmit = (e) => {
        if(!form.isValid()){
            console.log(form.getErrors())
        }else{
            console.log(form.getValues())
        }
    }
    // You could use a form onSubmit event rather than a Fragment here. 
    // This has just been done for illustrative purposes that the form tags are not required as the validation 
    return (
        <Fragment>
            <input {...nameInput} />
            <button onClick={handleSubmit}>Submit</button>
        </Fragment>
    )
}
```

### useForm()
```jsx
const form = useForm();
```

##### What is the form object?
The form object has a number of apis that you can use to interogate the current state of your reinform form.

##### isValid()
```jsx
form.isValid();
```
Calling the `isValid()` method on a form will check the validation rules on each input and return `true`/`false` based on whether any of those inputs have validation errors.

##### getValues() / getErrors()
```jsx
form.getValues();
form.getErrors();
```
Will return an object keyed by each input's name, as defined in the `useInput()` config with either the current value of each input or an array of strings of errors respectively.

### useInput()
```jsx
const form = useForm();
const firstnameInput = useInput({
    displayName: 'First Name',
    name: 'firstName',
    validation: {
        required: true,
    }
}, form);
```
The validation object passed to the `useInput()` config has the following options:
```jsx
{
    maxLength: 10, //int
    minLength: 5, //int
    required: true, //bool
    email: false, //bool
    customValidator: (value) => {
        if(value !== 'My Name'){
            return "This input must equal 'My Name'"
        }
    }
}
```

From the above basic input config above the `useInput()` returns an object designed to be spread over an input component. 

```jsx
{
    ...config,
    "aria-label": "First Name",
    errors: ["First Name is required"],
    onChange: function(e){...},
    onBlur: function(e){...}, // currently just calls validateField()
    validateField: function(){...},
    value: ""
}
```

You could just spread this object over a standard input: 
```jsx
<input {...firstnameInput} />
```
however this does not handle/display any validation errors and will cause console warnings as `validateField` is not a valid prop on a DOM element.

It is far better to create your own input component that handles the input object, here is an example using styled components:
```jsx
<CustomInput {...firstnameInput} />
```
```jsx
const CustomInput = ({ errors, validateField, label, ...props }) => {
    return (
        <InputContainer hasErrors={errors && errors.length > 0}>
            {props.label && <label>{props.label}</label>}
            <input {...props} />           
            <ErrorList errors={errors} />           
        </InputContainer>
    )
}

const ErrorList = ({ errors, ...props }) => {
    return errors && errors.length > 0 ? (
        <Ul role="alert" {...props}>
            {errors.map((error, index) => (
                <li key={`error-${index}`}>{error}</li>
            ))}
        </Ul>
    ) : null;
};

const Ul = styled.ul`
    padding: 0px;
    list-style: none;
    display: block;
    margin: 5px 0;
    li {
        font-size: 12px;
        background: ${props => lighten(0.4, props.theme.danger)};
        border: 1px solid ${props => lighten(0.3, props.theme.danger)};
        color: ${props => darken(0.2, props.theme.danger)};
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 2px;
    }
`;

const InputContainer = styled.div`
    font-size:16px;
    input {
        margin-top: 4px;
        background: #fff;
        border: 1px solid;
        border-color: ${props => props.hasErrors ? props.theme.danger : props.theme.grey};
        border-radius: 5px;
        padding: 15px;
        font-size:16px;
        width: 100%;
        &::placeholder {
            color: ${props => props.theme.darkGrey};
        }
    }
`;
```
