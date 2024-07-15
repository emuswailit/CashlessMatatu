import React from "react";
import AppTextInput from "../Label";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";

function FormLabel({ name, width, placeholder, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    handleChange,
    values,
    onChangeText,
  } = useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        {...otherProps}
        value={values[name]}
        width={width}
        placeholder={placeholder}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormLabel;
