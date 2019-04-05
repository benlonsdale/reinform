import React, { useCallback, useEffect } from "react";
import handleValidation from '../Utils/handleValidation';

const useInput = ({ validation, defaultValue, showPlaceholder, ...config }, form) => {
    const { name, displayName } = config;
    if (!name) throw new Error('"name" is a required key in the config');
    if (!displayName) displayName = name;
    useEffect(
        () => {
            form.dispatch({
                type: "setValidationRules",
                payload: { [name]: validation }
            });
            form.dispatch({
                type: "setConfig",
                payload: { [name]: config }
            })
        },
        [config.validation]
    );

    const errors = form.errors[name] ? form.errors[name] : [];
    const value = form.values[name] ? form.values[name] : "";

    useEffect(
        () => {
            form.dispatch({
                type: "update",
                payload: {
                    values: {
                        [name]: defaultValue ? defaultValue : value
                    },
                    // errors: {
                    //     [name]: errors
                    // }
                }
            });
        },
        [name, defaultValue]
    );

    const valueSetter = useCallback(e => {
        let value;
        if (e.target !== undefined) {
            value = e.target.value;
        } else {
            value = e;
        }

        form.dispatch({
            type: "update",
            payload: {
                values: {
                    [name]: value
                },
                errors: {
                    [name]: []
                }
            }
        });
    }, [value]);

    const validateField = useCallback(e => {
        const state = {
            values: form.values,
            errors: form.errors,
        }
        let newErrors = [];
        if (validation !== undefined) {
            Object.keys(validation).forEach(key => {
                const validationConfig = { value, test: validation[key], key, state, displayName };
                const err = handleValidation(validationConfig);
                if (err) {
                    newErrors.push(err);
                }
            });
        }
        form.dispatch({
            type: "update",
            payload: {
                values: {
                    [name]: value
                },
                errors: {
                    [name]: newErrors
                }
            }
        });
    }, [value, displayName])

    return {
        ...config,
        "aria-label": config["aria-label"] ? config["aria-label"] : displayName,
        errors: errors.length > 0 ? errors : undefined,
        label: config.label ? config.label : (!config.hideLabel ? displayName : undefined),
        onChange: valueSetter,
        onBlur: validateField,
        placeholder: config.placeholder ? config.placeholder : (showPlaceholder ? displayName : undefined),
        validateField,
        value
    };
};

export default useInput;