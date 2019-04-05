import React, {Fragment, useCallback} from 'react'
// import { hot } from 'react-hot-loader'
import {useForm, useInput} from 'reinform';

const App = () => {
    const form = useForm();
    const name = useInput({
        displayName: 'Your Name',
        name: 'name',
        showPlaceholder: true,
        validation: {
            required: true,
            customValidator(value){
                if(value !== 'Max'){
                    return "You need to enter Max"
                }
            }
        }
    }, form);

    const handleClick = useCallback(() => {
        console.log(form.isValid());
        // console.log(form.getValues());
        // console.log(form.getErrors());
    })

    return (
        <Fragment>
            <h1>Hello, world.</h1>
            <input {...name} />
            <pre>{JSON.stringify(name.errors)}</pre>
            <button onClick={handleClick}>Click</button>
        </Fragment>
    );
}

export default App;