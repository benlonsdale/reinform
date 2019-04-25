import { emailRegex, phoneNumberRegex } from './regex';
import moment from 'moment';

const handleValidation = ({ value, test, key, state, displayName }) => {
    try{
        switch (key) {
            case "maxLength": {
                if (value.length > test) {
                    return `Maximum length for this input is ${test}`;
                }
                break;
            }
            case "minLength": {
                if (value.length > 0 && value.length < test) {
                    return `Minimum length for this input is ${test}`;
                }
                break;
            }
            case "required": {
                if (test === true && value.length < 1) {
                    return `${displayName} is required`;
                }
                break;
            }
            case "email": {
                if (test === true && value.length > 0 && !emailRegex.test(value)) {
                    return 'Please enter a valid email address';
                }
                break;
            }
            case "phone": {
                if (test === true && value.length > 0 && !phoneNumberRegex.test(value)) {
                    return 'Please enter a valid phone number';
                }
                break;
            }
            case "date": {
                const date = moment(value, 'DD-MM-YYYY', true)
                if (test === true && !date.isValid()) {
                    return 'Please enter a valid date'
                }
                break;
            }
            case "customValidator": {
                return test(value, state);
            }
            default: {
                return undefined;
            }
        }
    }
    catch(e){
        console.log(e);
    }
    
    return undefined;
};

export default handleValidation;