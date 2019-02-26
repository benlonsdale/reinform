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

    const getValues = () => state.values;

    const getErrors = () => state.errors;

    const isValid = () => {
        if (Object.keys(state.values).length === 0) return false;
        return validateForm(state, dispatch);
    };

    return {
        dispatch,
        getErrors,
        getValues,
        isValid,
    };
};

export default useForm;