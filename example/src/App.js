import React, { Fragment, useCallback, useRef, useEffect } from 'react'
import {useForm, useInput} from 'reinform';
import { Input, FormGroup, Label } from 'reactstrap';
import Cleave from 'cleave.js';

const DateInput = ({onChange, onBlur, ...props}) => {
    const inputEl = useRef();
    useEffect(() => {
        new Cleave(inputEl.current, {
            date: true,
            delimiter: '-',
            datePattern: ['d', 'm', 'Y']
        });
    }, []);
    
    const handlers = useRef({});
    useEffect(()=>{
        inputEl.current.removeEventListener('input', handlers.current.onChange);
        inputEl.current.removeEventListener('blur', handlers.current.onBlur);

        handlers.current = {
            onBlur,
            onChange,
        }

        inputEl.current.addEventListener('input', handlers.current.onChange);
        inputEl.current.addEventListener('blur', handlers.current.onBlur);
    }, [onChange, onBlur])


    return (
        <FormGroup>
            <Label for={props.name}>{props.displayName}</Label>
            <Input
                {...props}
                innerRef={inputEl}
                className={
                    "form-control " +
                    (props.errors && props.errors.length > 0 ? "is-invalid" : "") +
                    (props.value &&
                        props.errors &&
                        props.value.length > 0 &&
                        props.errors.length === 0
                        ? "is-valid"
                        : "")
                }
                onBlur={handlers.current.onBlur}
                onChange={handlers.current.onChange}
                invalid={props.errors && props.errors.length > 0}
                valid={
                    props.value &&
                    props.errors &&
                    props.value.length > 0 &&
                    props.errors.length === 0
                }
            />
            <pre>{JSON.stringify(props.errors)}</pre>
        </FormGroup>
    )
}

// const DateInput = ({onBlur, ...props}) => {
//     console.log('value in render', props.value);
//     return (
//         <InputMask 
//             {...props} 
//             mask="99-99-9999" 
//             maskChar=" " 
//             onBlur={(e) => {
//                 let value = ""+e.target.value;
//                 console.log(value)
//                 const reg = /([0 - 9])/;
//                 console.log('test', reg.test(value))
//                 if (!reg.test(value)){
//                     console.log('here')
//                     value = '';
//                     props.onChange(value)
//                 }                
                
//                 onBlur(e);
//             }}
//         >
//             {(inputProps) => <Input {...inputProps} />}
//         </InputMask>
//     )
// }

const App = () => {
    const form = useForm();
    // const name = useInput({
    //     displayName: 'Your Name',
    //     name: 'name',
    //     showPlaceholder: true,
    //     getValue(rawValue){
    //         return rawValue + ' Modified'
    //     },
    //     validation: {
    //         required: true,
    //     }
    // }, form);

    const date = useInput({
        displayName: 'Date',
        name: 'date',
        placeholder: 'DD-MM-YYYY',     
        validation: {
            required: true,
            date: true
        }
    }, form);

    const date2 = useInput({
        displayName: 'Date2',
        name: 'date2',
        placeholder: 'DD-MM-YYYY',
        validation: {
            required: true,
            date: true
        }
    }, form);

    const handleClick = useCallback(() => {
        console.log('values', form.getValues());
        console.log(form.isValid());
        // console.log(form.getErrors());
    })

    console.log(date.onBlur.toString())

    // console.table(form.getValues());

    return (
        <Fragment>
            <h1>Hello, world.</h1>            
            <DateInput {...date} />
            <DateInput {...date2} />
            <button onClick={handleClick}>Click</button>
            <button onClick={() => name.appendError('added')}>Append</button>
        </Fragment>
    );
}

export default App;