import React, { useCallback, useEffect, useRef } from "react";
import { isEqual } from "lodash";
import handleValidation from "../Utils/handleValidation";

const useInput = (
  { validation, defaultValue, showPlaceholder, ...config },
  form
) => {
  const { name } = config;
  let { displayName } = config;
  if (!name) throw new Error('"name" is a required key in the config');
  if (!displayName) displayName = name;
  useEffect(() => {
    form.dispatch({
      type: "setValidationRules",
      payload: { [name]: validation }
    });
    form.dispatch({
      type: "setConfig",
      payload: { [name]: config }
    });
  }, [config.validation]);

  const errors = form.errors[name] ? form.errors[name] : [];
  const value = form.values[name] ? form.values[name] : "";
  let label = undefined;

  if (config.label !== undefined) {
    label = config.label;
  } else if (config.label === undefined && !config.hideLabel) {
    label = displayName;
  }

  if (
    validation !== undefined &&
    validation.required &&
    validation.required === true
  ) {
    label = label + "*";
  }

  const defaultValueRef = useRef();
  useEffect(() => {
    if (!isEqual(defaultValueRef.current, defaultValue)) {
      defaultValueRef.current = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    form.dispatch({
      type: "update",
      payload: {
        values: {
          [name]: defaultValueRef.current ? defaultValueRef.current : value
        },
        errors: {
          [name]: errors
        }
      }
    });
  }, [name, defaultValueRef.current]);

  const valueSetter = useCallback(
    e => {
      let value;

      if (config && config.type !== undefined && config.type === "file") {
        value = e.target.files;
      } else if (e !== undefined && e !== null) {
        if (e.target !== undefined) {
          value = e.target.value;
        } else {
          value = e;
        }
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
    },
    [value]
  );

  function validateField(e) {
    const state = {
      values: form.values,
      errors: form.errors
    };

    let newErrors = [];
    if (validation !== undefined) {
      Object.keys(validation).forEach(key => {
        const validationConfig = {
          value,
          test: validation[key],
          key,
          state,
          displayName
        };
        const err = handleValidation(validationConfig);
        if (err) {
          newErrors.push(err);
        }
      });
    }

    form.dispatch({
      type: "update",
      payload: {
        // values: {
        //     [name]: value
        // },
        errors: {
          [name]: newErrors
        }
      }
    });

    return newErrors.length < 1;
  }

  function appendError(errorString) {
    form.dispatch({
      type: "appendError",
      payload: {
        key: name,
        error: errorString
      }
    });
  }

  return {
    ...config,
    "aria-label": config["aria-label"] ? config["aria-label"] : displayName,
    appendError,
    errors,
    label: label,
    onChange: valueSetter,
    onBlur: validateField,
    placeholder: config.placeholder
      ? config.placeholder
      : showPlaceholder
      ? displayName
      : undefined,
    validateField,
    value
  };
};

export default useInput;
