import handleValidation from './handleValidation';

const validateForm = (state, dispatch) => {
    const { values, validationRules, config } = state;
    let isValid = true;
    Object.entries(values).forEach(([name, value]) => {
        const valueErrors = [];
        if(validationRules[name] === undefined) return;
        Object.entries(validationRules[name]).forEach(([key, test]) => {
            const validationConfig = { value, test, key, state, displayName: config[name].displayName };
            const validatorResponse = handleValidation(validationConfig);
            if (validatorResponse !== undefined) {
                valueErrors.push(validatorResponse);
                isValid = false;
            }
        });
        dispatch({
            type: "update",
            payload: {
                values: {
                    [name]: value,
                },
                errors: {
                    [name]: valueErrors,
                }
            }
        });
    });
    return isValid;
};

export default validateForm;