import { emailRegex, phoneNumberRegex } from './regex';

const handleValidation = ({ value, test, key, state, displayName }) => {
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
        case "customValidator": {
            return test(value, state);
        }
        default: {
            return undefined;
        }
    }
    return undefined;
};

export default handleValidation;