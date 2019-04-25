import React, { useReducer } from "react";
import validateForm from '../Utils/validateForm';

const formReducer = (state, action) => {
    switch (action.type) {
        case "setValidationRules": {
            return {
                ...state,
                validationRules: {
                    ...state.validationRules,
                    ...action.payload
                }
            };
        }
        case "update": {
            return {
                ...state,
                values: {
                    ...state.values,
                    ...action.payload.values ? action.payload.values : {}
                },
                errors: {
                    ...state.errors,
                    ...action.payload.errors
                }
            };
        }
        case "setConfig": {
            return {
                ...state,
                config: {
                    ...state.config,
                    ...action.payload
                }
            };
        }
        case "appendError": {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.key]: [...state.errors[action.payload.key], action.payload.error]
                }
            }
        }
        default: {
            return state;
        }
    }
};

const useForm = () => {
    const [state, dispatch] = useReducer(formReducer, {
        errors: {},
        values: {},
        validationRules: {},
        config: {}
    });

    // Reduce over values and apply getValue() to inputs where passed in as part of input config
    const getValues = () => Object.entries(state.values).reduce((values, [inputKey, inputValue]) => {
        values[inputKey] = state.config[inputKey].getValue !== undefined ? state.config[inputKey].getValue(inputValue) : inputValue;
        return values;
    }, {});

    const getErrors = () => state.errors;

    const isValid = () => {
        if (Object.keys(state.values).length === 0) return false;
        return validateForm(state, dispatch);
    };

    return {
        dispatch,
        getErrors,
        errors: state.errors,
        getValues,
        values: state.values,
        isValid,
    };
};

export default useForm;